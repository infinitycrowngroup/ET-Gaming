import requests
import json

try:
    url = "http://localhost:5001/contact"
    data = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "Hello from verification script"
    }
    print(f"Sending POST to {url}...")
    response = requests.post(url, json=data, timeout=5)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
