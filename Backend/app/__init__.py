from flask import Flask
from .extensions import socketio
from .events import *  # Import events to register handlers

def create_app():
    """
    App factory to create and configure the Flask app.
    """
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'secret!'  # Change this in production

    # Initialize extensions
    socketio.init_app(app)
    
    from flask_cors import CORS
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Optional: Add a simple HTTP route for testing/health check
    @app.route('/')
    def index():
        return "Real-Time Counters Backend is Running! Go to <a href='/test_client.html'>/test_client.html</a>"

    @app.route('/test_client.html')
    def test_client():
        import os
        path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'test_client.html')
        with open(path, 'r') as f:
            return f.read()


    # Register Blueprints
    from .routes import main_bp
    app.register_blueprint(main_bp)

    return app
