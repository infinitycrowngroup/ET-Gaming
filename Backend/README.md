# Real-Time Live Counters (Flask Backend)

This is a modular, production-ready backend design for a real-time analytics system similar to YouTube Live Counters.

## Architecture

- **Flask**: Web framework.
- **Flask-SocketIO**: Handles WebSocket connections for real-time bidirectional communication.
- **Eventlet**: Async network library for high performance.
- **YouTube Data API**: Backend polls YouTube API every hour to sync official stats.
- **Components**:
    - `app/youtube.py`: Service to fetch channel stats.
    - `app/store.py`: Centralized state management.
    - `run.py`: Entry point with background scheduler.

## Setup & Run

1.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

2.  **Configure Environment**:
    Create a `.env` file in the root directory:
    ```env
    YOUTUBE_API_KEY=your_google_api_key
    YOUTUBE_CHANNEL_ID=your_channel_id
    ```

3.  **Run the Server**:
    ```bash
    python run.py
    ```
    The server listens on `http://localhost:5000`.

## Features
- **Real-Time Updates**: Frontend receives updates immediately via WebSockets.
- **YouTube Sync**: Automatically fetches Subscribers, Views, and Video Count every hour.
- **Frontend Integration**: See [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) for React integration.

## Troubleshooting
- If `YOUTUBE_API_KEY` is missing, the server will log a warning and run without syncing (keeping initial static values).
- Ensure your API key has "YouTube Data API v3" enabled in Google Cloud Console.

## Resend Email (Contact Form)

This project now uses Resend's HTTP API for sending contact form emails (works on hosts that block outbound SMTP).

Required environment variables (set these in your host dashboard, e.g., Render/Railway/Vercel):

- `RESEND_API_KEY` — Your Resend API key (keep secret)
- `CONTACT_EMAIL_TO` — Your inbox/email that receives contact messages
- `CONTACT_EMAIL_FROM` — Optional: Verified sender email in Resend (defaults to `CONTACT_EMAIL_TO`)
- `EMAIL_TEST_MODE` — Optional: set to `True` to skip sending and simulate success

Example JSON request (frontend -> backend):

```js
fetch('https://your-backend.example.com/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice', email: 'alice@example.com', message: 'Hello!' })
})
.then(r => r.json()).then(console.log)
```

Local testing

1. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
2. Create a `.env` file in `Backend/` (example values shown in `.env` file).
3. Start the backend:
    ```bash
    python app.py
    ```
4. Run the included test script (optionally set `EMAIL_TEST_MODE=True` to simulate sending):
    ```bash
    python test_contact_endpoint.py
    ```

Common deployment pitfalls

- Missing environment variables: ensure `RESEND_API_KEY` and `CONTACT_EMAIL_TO` are set in your hosting provider's secret/env settings.
- Unverified sender: if you set `CONTACT_EMAIL_FROM`, make sure that address is verified in your Resend account or the API call may be rejected.
- CORS: ensure the frontend origin is allowed or use `flask-cors` as configured.
- Rate limiting: implement a rate limiter if you see spam.

If your hosting provider blocks outbound HTTP requests to external APIs (rare), use the provider's recommended email add-on or a serverless function in a provider that allows external requests.
