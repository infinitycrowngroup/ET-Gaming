from flask_socketio import SocketIO

# Initialize SocketIO without app (factory pattern)
socketio = SocketIO(cors_allowed_origins="*", async_mode='eventlet')
