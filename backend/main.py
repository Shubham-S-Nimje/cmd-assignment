from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import campaigns, dashboard, external
from app.database.connection import engine
from app.database.base import Base


app = FastAPI(
    title="Campaign Management API",
    description="Backend API for campaign management dashboard",
    version="1.0.0"
)

# @app.on_event("startup")
# def startup():
#     Base.metadata.create_all(bind=engine)


# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(campaigns.router, prefix="/api/campaigns", tags=["Campaigns"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(external.router, prefix="/api/external", tags=["External API"])

@app.get("/")
def root():
    return {"message": "Campaign Management API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}