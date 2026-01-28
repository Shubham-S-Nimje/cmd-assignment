from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID
from enum import Enum

class CampaignStatus(str, Enum):
    pending = "pending"
    active = "active"
    completed = "completed"

class CampaignBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    status: CampaignStatus = CampaignStatus.pending
    budget: float = Field(default=0.0, ge=0)

class CampaignCreate(CampaignBase):
    pass

class CampaignUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    status: Optional[CampaignStatus] = None
    budget: Optional[float] = Field(None, ge=0)

class CampaignResponse(CampaignBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True