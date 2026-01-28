from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.campaign import Campaign, CampaignStatus
from app.schemas.dashboard import DashboardStats, BudgetStats

# dashboard
def get_campaign_stats(db: Session) -> DashboardStats:
    
# campaigns count
    total_campaigns = db.query(func.count(Campaign.id)).scalar() or 0
    
# Status wise counts
    status_counts_query = db.query(
        Campaign.status,
        func.count(Campaign.id)
    ).group_by(Campaign.status).all()
    
    status_counts = {status.value: count for status, count in status_counts_query}
    for status in CampaignStatus:
        if status.value not in status_counts:
            status_counts[status.value] = 0
    
# budget statistics
    budget_agg = db.query(
        func.sum(Campaign.budget).label('total'),
        func.avg(Campaign.budget).label('average'),
        func.min(Campaign.budget).label('min'),
        func.max(Campaign.budget).label('max')
    ).first()
    
    budget_stats = BudgetStats(
        total=budget_agg.total or 0.0,
        average=budget_agg.average or 0.0,
        min=budget_agg.min or 0.0,
        max=budget_agg.max or 0.0
    )
    
    return DashboardStats(
        total_campaigns=total_campaigns,
        status_counts=status_counts,
        budget_stats=budget_stats
    )