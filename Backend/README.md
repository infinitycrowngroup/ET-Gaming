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
