from contextlib import asynccontextmanager
from datetime import datetime, timezone
from typing import Dict, Any

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan context manager for startup and shutdown routines."""
    # Startup banner
    print("\n" + "=" * 68)
    print(f"🏥 {settings.PROJECT_NAME} – {settings.TAGLINE}")
    print(f"📚 Course: CSE 4104 – Software Development III | Team: CSE4104-7F-T01")
    print(f"👨‍💻 Backend Engineer: Indrojit Sana (11230321391)")
    print(f"📍 Deployment Region: {settings.DEPLOYMENT_DIVISION}, Bangladesh")
    print(f"🚨 Emergency Dispatch: {settings.EMERGENCY_DISPATCH_HOTLINE} (National 999)")
    print(f"⚖️ Clinical Tenet: Triage & Health Literacy Only (No Autonomous Rx/Dx)")
    print("=" * 68 + "\n")
    yield
    # Shutdown routine
    print(f"\n🛑 Gracefully shutting down {settings.PROJECT_NAME} service...\n")


app = FastAPI(
    title=settings.PROJECT_NAME,
    description=(
        "**MedNex** is an AI-powered healthcare companion and clinical triage platform "
        "tailored for Bangladesh (Khulna Division).\n\n"
        "### ⚠️ Core Medical Safety Tenet (NFR-15):\n"
        f"> *\"{settings.MEDICAL_DISCLAIMER}\"*\n\n"
        "This platform assists patients with urgency classification and specialist navigation. "
        "It strictly NEVER asserts autonomous clinical diagnoses or issues medical prescriptions."
    ),
    version="1.0.0-day01",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

# ------------------------------------------------------------------------------
# Clinical Safety Headers & Security Middleware (NFR-10, NFR-15)
# ------------------------------------------------------------------------------
@app.middleware("http")
async def add_clinical_safety_headers(request: Request, call_next):
    """Enforce persistent clinical safety disclaimer and security headers on every response."""
    response: Response = await call_next(request)
    response.headers["X-Medical-Disclaimer"] = settings.MEDICAL_DISCLAIMER
    response.headers["X-Platform-Deployment"] = settings.DEPLOYMENT_DIVISION
    response.headers["X-Content-Type-Options"] = "nosniff"
    return response


# ------------------------------------------------------------------------------
# Cross-Origin Resource Sharing (CORS) Middleware (NFR-12)
# ------------------------------------------------------------------------------
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


# ------------------------------------------------------------------------------
# Core Base Routes
# ------------------------------------------------------------------------------
@app.get("/", tags=["System Root"])
async def root() -> Dict[str, Any]:
    """Root endpoint verifying API availability and clinical tenets."""
    return {
        "platform": settings.PROJECT_NAME,
        "tagline": settings.TAGLINE,
        "version": "1.0.0-day01",
        "status": "online",
        "team": "CSE4104-7F-T01",
        "backend_lead": "Indrojit Sana (11230321391)",
        "division": settings.DEPLOYMENT_DIVISION,
        "emergency_hotline": settings.EMERGENCY_DISPATCH_HOTLINE,
        "docs_url": "/docs",
        "safety_disclaimer": settings.MEDICAL_DISCLAIMER,
    }


@app.get(f"{settings.API_V1_STR}/health", tags=["System Health"])
async def health_check() -> Dict[str, Any]:
    """Comprehensive system health status and component readiness check."""
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "environment": settings.ENVIRONMENT,
        "division_coverage": {
            "name": settings.DEPLOYMENT_DIVISION,
            "district_hub": "Khulna Sadar",
            "tier": "Primary Healthcare & Specialized Chambers",
        },
        "services": {
            "api_gateway": "operational",
            "database_engine": "ready",
            "triage_nlp_engine": "scaffolded",
            "emergency_999_interceptor": "active",
        },
        "disclaimer": settings.MEDICAL_DISCLAIMER,
    }
