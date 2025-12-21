import os
import requests
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/channels"

def fetch_channel_stats(api_key, channel_id):
    """
    Fetches real-time statistics from YouTube Data API v3.
    
    Args:
        api_key (str): YouTube Data API Key.
        channel_id (str): YouTube Channel ID.
        
    Returns:
        dict: valid stats dictionary or None if error.
    """
    if not api_key or not channel_id:
        logger.warning("YouTube API credentials missing. Skipping fetch.")
        return None

    params = {
        "part": "statistics",
        "id": channel_id,
        "key": api_key
    }

    try:
        response = requests.get(YOUTUBE_API_URL, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

        if "items" in data and len(data["items"]) > 0:
            stats = data["items"][0]["statistics"]
            
            # Key mapping to match frontend/store
            # Note: subscriberCount is often rounded by YouTube API
            return {
                "subscribers": int(stats.get("subscriberCount", 0)),
                "total_views": int(stats.get("viewCount", 0)),
                "videos_published": int(stats.get("videoCount", 0))
            }
        else:
            logger.error(f"No channel found for ID: {channel_id}")
            return None

    except requests.exceptions.RequestException as e:
        logger.error(f"YouTube API Request failed: {e}")
        return None
