from pydantic import BaseModel
from typing import Dict

class BudgetStats(BaseModel):
    total: float
    average: float
    min: float
    max: float

class DashboardStats(BaseModel):
    total_campaigns: int
    status_counts: Dict[str, int]
    budget_stats: BudgetStats