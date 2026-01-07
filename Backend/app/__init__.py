from flask import Flask, jsonify
from .extensions import socketio
from .events import *  # Import events to register handlers
import logging
import sys


def create_app():
    """App factory to create and configure the Flask app."""
    app = Flask(__name__)

    # Load basic config
    app.config['SECRET_KEY'] = 'change-me-in-production'

    # Configure structured logging to stdout (Render reads stdout/stderr)
    handler = logging.StreamHandler(stream=sys.stdout)
    formatter = logging.Formatter('%(asctime)s %(levelname)s %(name)s: %(message)s')
    handler.setFormatter(formatter)
    root_logger = logging.getLogger()
    if not root_logger.handlers:
        root_logger.addHandler(handler)
    root_logger.setLevel(logging.INFO)

    # Initialize extensions
    socketio.init_app(app)

    from flask_cors import CORS
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Health check
    @app.route('/')
    def index():
        return jsonify({'status': 'ok', 'service': 'ET Gaming Backend'})

    @app.route('/test_client.html')
    def test_client():
        import os
        path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'test_client.html')
        with open(path, 'r') as f:
            return f.read()

    # Register Blueprints
    from .routes import main_bp
    app.register_blueprint(main_bp)

    # Global error handler — ensures JSON responses on unexpected exceptions
    @app.errorhandler(Exception)
    def handle_exception(e):
        app.logger.exception('Unhandled exception: %s', e)
        response = jsonify({'success': False, 'error': 'Internal Server Error'})
        response.status_code = 500
        return response

    return app
