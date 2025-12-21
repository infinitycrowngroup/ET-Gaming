from flask import request
from .extensions import socketio
from .store import store

@socketio.on('connect')
def handle_connect():
    """
    Handle new client connections.
    Send the current snapshot of metrics immediately.
    """
    print(f"Client connected: {request.sid}")
    # Send snapshot
    socketio.emit('metrics_update', store.get_all_metrics(), to=request.sid)

@socketio.on('disconnect')
def handle_disconnect():
    print(f"Client disconnected: {request.sid}")
    # Optional: Log disconnect reason if available in context


def broadcast_update(metrics=None):
    """
    Helper function to broadcast metrics to all clients.
    If metrics is None, sends current state.
    """
    if metrics is None:
        metrics = store.get_all_metrics()
    print(f"Broadcasting stats_update: {metrics}")
    # Emit both events for compatibility
    socketio.emit('metrics_update', metrics)
    socketio.emit('stats_update', metrics)
