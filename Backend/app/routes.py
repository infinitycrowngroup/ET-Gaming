from flask import Blueprint, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
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
        logger.error(f"Input validation error: {e}")
        return jsonify({'success': False, 'error': 'Invalid request format'}), 400

    # 3. Email Logic
    try:
        # Load Env Vars Safely
        is_test_mode = os.getenv('EMAIL_TEST_MODE', 'False').lower() == 'true'
        
        # Test Mode Check (Strict)
        if is_test_mode:
            logger.info(f"[TEST MODE] Skipping SMTP. Email from {name} ({email}): {message}")
            return jsonify({'success': True, 'message': 'Test email simulated'}), 200

        # SMTP Config
        smtp_host = os.getenv('SMTP_HOST', 'smtp.gmail.com')
        smtp_port_str = os.getenv('SMTP_PORT', '587')
        smtp_user = os.getenv('SMTP_USER')
        smtp_pass = os.getenv('SMTP_PASS')
        recipient = os.getenv('CONTACT_EMAIL_TO')
        sender = os.getenv('CONTACT_EMAIL_FROM') or smtp_user

        # Port validation
        try:
            smtp_port = int(smtp_port_str)
        except ValueError:
            logger.error(f"Invalid SMTP_PORT: {smtp_port_str}")
            return jsonify({'success': False, 'error': 'Server configuration error'}), 500

        # Credential Check
        if not all([smtp_host, smtp_user, smtp_pass, recipient]):
            logger.error("Missing SMTP credentials in environment")
            return jsonify({'success': False, 'error': 'Server email configuration is missing'}), 500

        # Construct Message
        msg = MIMEMultipart()
        msg['From'] = sender
        msg['To'] = recipient
        msg['Subject'] = f"New Contact via ET Gaming: {name}"

        body = f"""
        New Contact Message Received:

        Name: {name}
        Email: {email}
        Discord: {discord}

        Message:
        --------------------------------------------------
        {message}
        --------------------------------------------------
        
        Sent from ET Gaming Website
        """
        msg.attach(MIMEText(body, 'plain'))

        # Send Email with Specific Exception Handling
        try:
            server = smtplib.SMTP(smtp_host, smtp_port, timeout=10)
            server.starttls()  # Upgrade connection
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
            server.quit()
            
            logger.info(f"Contact email successfully sent from {email}")
            return jsonify({'success': True}), 200

        except smtplib.SMTPAuthenticationError:
            logger.error("SMTP Authentication Failed. Check username/app password.")
            return jsonify({'success': False, 'error': 'Email server authentication failed'}), 500
        except smtplib.SMTPConnectError:
            logger.error("SMTP Connection Failed. Check host/port.")
            return jsonify({'success': False, 'error': 'Could not connect to email server'}), 500
        except smtplib.SMTPException as e:
            logger.error(f"SMTP Error: {e}")
            return jsonify({'success': False, 'error': 'Email sending failed'}), 500
        except Exception as e:
            logger.error(f"Unexpected Email Error: {e}")
            return jsonify({'success': False, 'error': 'An internal error occurred'}), 500

    except Exception as outer_e:
        # Catch-all for any other unforeseen crash in the route
        logger.exception(f"Critical error in /contact route: {outer_e}")
        return jsonify({'success': False, 'error': 'Server encountered a critical error'}), 500
