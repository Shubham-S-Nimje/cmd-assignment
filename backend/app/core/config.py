from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "https://cmd-assignment-production.netlify.app/campaigns"]
    SECRET_KEY: str = "9f2d8a7c1e4b9a1f7c3d0a6b8e2f4c9a"
    
    class Config:
        env_file = ".env"

settings = Settings()