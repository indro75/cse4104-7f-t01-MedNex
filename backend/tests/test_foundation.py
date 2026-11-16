import unittest
from app.main import app
from app.config import settings


class TestDay1Foundation(unittest.TestCase):
    """Test suite for Day 1 foundational setup and configuration."""

    def test_app_metadata(self):
        """Verify application title, metadata and clinical disclaimer."""
        self.assertEqual(app.title, settings.PROJECT_NAME)
        self.assertEqual(settings.DEPLOYMENT_DIVISION, "Khulna Division")
        self.assertIn("intelligent triage", settings.MEDICAL_DISCLAIMER)

    def test_core_routes_registered(self):
        """Verify root and health check endpoints are mapped."""
        routes = [route.path for route in app.routes]
        self.assertIn("/", routes)
        self.assertIn(f"{settings.API_V1_STR}/health", routes)
        self.assertIn("/docs", routes)
        self.assertIn("/openapi.json", routes)

    def test_cors_configuration(self):
        """Verify CORS origins list parsing and localhost allowances."""
        self.assertIsInstance(settings.BACKEND_CORS_ORIGINS, list)
        self.assertTrue(any("5173" in origin for origin in settings.BACKEND_CORS_ORIGINS))


if __name__ == "__main__":
    unittest.main()
