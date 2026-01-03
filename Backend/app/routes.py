from flask import Blueprint, request, jsonify
import requests
import os
import time
import logging
from flask_cors import cross_origin

# Create a Blueprint for routes
main_bp = Blueprint('main', __name__)

# Configure logging
logger = logging.getLogger(__name__)

# Simple in-memory rate limiter: {ip_address: last_request_time}
rate_limit_store = {}
RATE_LIMIT_SECONDS = 60


@main_bp.route('/contact', methods=['POST'])
@cross_origin()
def contact():
    # 1. Rate Limiting (Re-enable in production)
    # ip = request.remote_addr
    # current_time = time.time()
    # last_time = rate_limit_store.get(ip, 0)
    # if current_time - last_time < RATE_LIMIT_SECONDS:
    #     remaining = int(RATE_LIMIT_SECONDS - (current_time - last_time))
    #     return jsonify({'success': False, 'error': f'Please wait {remaining} seconds before sending another message.'}), 429
    # rate_limit_store[ip] = current_time

    # 2. Input Validation
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'error': 'No data provided'}), 400

        name = data.get('name')
        email = data.get('email')
        discord = data.get('discord', 'Not provided')
        message = data.get('message')

        if not all([name, email, message]):
            return jsonify({'success': False, 'error': 'Missing required fields (name, email, message)'}), 400
    except Exception as e:
        logger.exception(f"Input validation error: {e}")
        return jsonify({'success': False, 'error': 'Invalid request format'}), 400

    # 3. Email Logic using Resend HTTP API
    try:
        # Load Env Vars Safely
        is_test_mode = os.getenv('EMAIL_TEST_MODE', 'False').lower() == 'true'

        # Test Mode Check (Strict)
        if is_test_mode:
            logger.info(f"[TEST MODE] Skipping Resend API. Email from {name} ({email}): {message}")
            return jsonify({'success': True, 'message': 'Test email simulated'}), 200

        resend_key = os.getenv('RESEND_API_KEY')
        recipient = os.getenv('CONTACT_EMAIL_TO')
        sender_env = os.getenv('CONTACT_EMAIL_FROM')

        # Strict config checks: do NOT fallback sender to recipient
        if not resend_key or not recipient or not sender_env:
            logger.error("Missing Resend configuration: RESEND_API_KEY, CONTACT_EMAIL_FROM and/or CONTACT_EMAIL_TO not set")
            return jsonify({'success': False, 'error': 'Server email configuration is missing'}), 500

        # Validate sender format and enforce required sender
        # Expected format: Display Name <local@domain>
        import re
        m = re.match(r"^\s*(.*?)\s*<\s*([^>\s]+@[^>\s]+)\s*>\s*$", sender_env)
        if m:
            display_name = m.group(1).strip()
            sender_email = m.group(2).strip()
        else:
            # If user provided only an email, treat it as sender_email with no display name
            sender_email = sender_env.strip()
            display_name = ''

        # Enforce the exact allowed sender local-part/domain to avoid accidental gmail fallback
        REQUIRED_SENDER_EMAIL = 'onboarding@resend.dev'
        if sender_email.lower() != REQUIRED_SENDER_EMAIL:
            logger.error(f"Invalid CONTACT_EMAIL_FROM: found '{sender_env}'. Required sender email is '{REQUIRED_SENDER_EMAIL}'")
            return jsonify({'success': False, 'error': f"CONTACT_EMAIL_FROM must be '{REQUIRED_SENDER_EMAIL}' (use 'ET Gaming <{REQUIRED_SENDER_EMAIL}>')"}), 500

        # Construct canonical from string
        from_value = f"ET Gaming <{REQUIRED_SENDER_EMAIL}>"

        # Build the email body
        body = f"New Contact Message Received:\n\nName: {name}\nEmail: {email}\nDiscord: {discord}\n\nMessage:\n--------------------------------------------------\n{message}\n--------------------------------------------------\n\nSent from ET Gaming Website"

        payload = {
            "from": from_value,
            "to": [recipient],
            "subject": f"New Contact via ET Gaming: {name}",
            "text": body
        }

        headers = {
            'Authorization': f'Bearer {resend_key}',
            'Content-Type': 'application/json'
        }

        # Debug log payload (safe): do not log API key
        logger.debug("Resend payload prepared: from=%s to=%s subject=%s text=%s", from_value, payload['to'], payload['subject'], payload['text'][:200])

        try:
            resp = requests.post('https://api.resend.com/emails', json=payload, headers=headers, timeout=15)
        except requests.exceptions.RequestException as req_err:
            logger.exception(f"Network error when calling Resend API: {req_err}")
            return jsonify({'success': False, 'error': 'Failed to contact email service'}), 502

        if resp.status_code in (200, 202):
            logger.info(f"Resend accepted the message (status {resp.status_code})")
            return jsonify({'success': True, 'message': 'Email sent successfully'}), 200
        else:
            logger.error(f"Resend API error: status={resp.status_code} body={resp.text}")
            return jsonify({'success': False, 'error': 'Email service returned an error'}), 502

    except Exception as outer_e:
        logger.exception(f"Critical error in /contact route: {outer_e}")
        return jsonify({'success': False, 'error': 'Server encountered a critical error'}), 500

