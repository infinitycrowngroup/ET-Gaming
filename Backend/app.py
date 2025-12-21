import eventlet
# Patch standard library for async operations
eventlet.monkey_patch()

from app import create_app, socketio

app = create_app()

def periodic_updater():
    """
    Background task to poll YouTube API every hour (3600s).
    Also runs once immediately on startup.
    """
    from app.store import store
    from app.events import broadcast_update
    from app.youtube import fetch_channel_stats
    import os
    from dotenv import load_dotenv
    
    load_dotenv() # Load env vars
    
    api_key = os.getenv("YOUTUBE_API_KEY")
    channel_id = os.getenv("YOUTUBE_CHANNEL_ID")
    
    if not api_key:
        print("WARNING: YOUTUBE_API_KEY not found in environment. Real-time sync disabled.")
        return

    while True:
        print("Polling YouTube API...")
        new_stats = fetch_channel_stats(api_key, channel_id)
        
        if new_stats:
            updated = False
            for key, value in new_stats.items():
                if store.update_metric(key, value):
                    updated = True
                    print(f"Updated {key}: {value}")
            
            if updated:
                broadcast_update()
                print("Broadcasted updated metrics.")
        
        eventlet.sleep(3600) # Poll every hour

if __name__ == '__main__':
    print("Starting Flask-SocketIO server on http://localhost:5000")
    eventlet.spawn(periodic_updater)
    socketio.run(app, debug=False, host='0.0.0.0', port=5001)
