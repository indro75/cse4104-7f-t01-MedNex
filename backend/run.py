import uvicorn
from app.config import settings


def main():
    """Launch MedNex FastAPI application with Uvicorn ASGI server."""
    print("=" * 72)
    print("   🏥 MedNex – AI-Powered Healthcare Assistance & Clinical Triage")
    print(f"   Tagline: {settings.TAGLINE}")
    print("   Course: CSE 4104 – Software Development III | Team: CSE4104-7F-T01")
    print("   Backend Lead: Indrojit Sana (11230321391)")
    print(f"   Deployment Hub: {settings.DEPLOYMENT_DIVISION}, Bangladesh")
    print("=" * 72)
    print(f" • Server listening on   : http://{settings.HOST}:{settings.PORT}")
    print(f" • Interactive Swagger UI: http://localhost:{settings.PORT}/docs")
    print(f" • ReDoc Documentation   : http://localhost:{settings.PORT}/redoc")
    print(f" • Health Check Endpoint  : http://localhost:{settings.PORT}{settings.API_V1_STR}/health")
    print(f" • Clinical Safety Rule  : {settings.MEDICAL_DISCLAIMER}")
    print("=" * 72)

    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info",
    )


if __name__ == "__main__":
    main()
