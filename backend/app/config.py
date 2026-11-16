from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings with environment variable support."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

    # Project Information (CSE 4104 - CSE4104-7F-T01)
    PROJECT_NAME: str = "MedNex API"
    TAGLINE: str = "Smarter Healthcare. Better Decisions"
    API_V1_STR: str = "/api"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    PORT: int = 8000
    HOST: str = "0.0.0.0"

    # Security & Tokens
    SECRET_KEY: str = "temporary-dev-secret-key-change-in-production-for-mednex"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # Database (SQLite default for dev, PostgreSQL production compatible)
    DATABASE_URL: str = "sqlite:///./mednex.db"

    # CORS Whitelist for Client Applications (NFR-12)
    BACKEND_CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000"
    ]

    # Localization & Emergency Dispatch (Khulna Hub)
    DEPLOYMENT_DIVISION: str = "Khulna Division"
    EMERGENCY_DISPATCH_HOTLINE: str = "999"

    # Mandatory Clinical Safety Disclaimer (NFR-15)
    MEDICAL_DISCLAIMER: str = (
        "MedNex provides intelligent triage and health literacy support, "
        "not clinical diagnosis or medical prescriptions."
    )

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)


settings = Settings()
