class MetricsStore:
    """
    Singleton class to manage application state (metrics).
    Designed to be extensible to use a database in the future.
    """
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MetricsStore, cls).__new__(cls)
            cls._instance._init_data()
        return cls._instance

    def _init_data(self):
        # Initial dummy data matching user request
        self._metrics = {
            "subscribers": 963,
            "total_views": 97990,
            "community_members": 500,
            "videos_published": 481
        }

    def get_all_metrics(self):
        """Return a snapshot of all metrics."""
        return self._metrics

    def update_metric(self, key, value):
        """
        Update a single metric.
        In a real app, this would update the DB and then trigger an event.
        """
        if key in self._metrics:
            self._metrics[key] = value
            return True
        return False

    def increment_metric(self, key, amount=1):
        """Increment a metric by a given amount."""
        if key in self._metrics:
            self._metrics[key] += amount
            return self._metrics[key]
        return None

# Global instance
store = MetricsStore()
