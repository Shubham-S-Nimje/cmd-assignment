from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.schemas.dashboard import DashboardStats
from app.services import dashboard_service

router = APIRouter()

# Dashboard data
@router.get("/stats", response_model=DashboardStats)
def get_dashboard_statistics(db: Session = Depends(get_db)):
    stats = dashboard_service.get_campaign_stats(db)
    return stats