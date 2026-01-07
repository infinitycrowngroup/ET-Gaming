import express from 'express';
const router = express.Router();

// Basic email regex (reasonable, not perfect)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePayload(body) {
  const errors = [];
  if (!body) {
    errors.push('Missing JSON body');
    return errors;
  }
  if (!body.name || String(body.name).trim().length < 2) errors.push('name is required');
  if (!body.email || !EMAIL_RE.test(body.email)) errors.push('valid email is required');
  if (!body.message || String(body.message).trim().length < 5) errors.push('message is required (min 5 chars)');
  return errors;
}

async function sendViaResend({ name, email, discord, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — skipping actual email send');
    return { ok: true, skipped: true };
  }

  const payload = {
    from: process.env.CONTACT_EMAIL_FROM || 'ET Gaming <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL_TO || 'businessgbros@gmail.com',
    subject: `Contact form submission from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Discord:</strong> ${discord || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <div>${String(message).replace(/\n/g, '<br>')}</div>
    `,
  };

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) {
    const err = new Error(`Resend API error: ${res.status} ${text}`);
    err.status = 502;
    throw err;
  }

  return { ok: true, result: text };
}

router.post('/', async (req, res) => {
  try {
    const errors = validatePayload(req.body);
    if (errors.length) return res.status(400).json({ success: false, error: 'Validation failed', details: errors });

    const { name, email, discord, message } = req.body;

    // Attempt to send email but don't let email failure crash the route without a handled response
    try {
      await sendViaResend({ name, email, discord, message });
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr && emailErr.stack ? emailErr.stack : emailErr);
      // Return a 502 indicating upstream email service problem, but the endpoint itself handled the request
      return res.status(502).json({ success: false, error: 'Email service failure', details: emailErr.message || String(emailErr) });
    }

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err && err.stack ? err.stack : err);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

export default router;
