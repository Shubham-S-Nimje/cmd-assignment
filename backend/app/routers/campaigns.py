from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.database.connection import get_db
from app.schemas.campaign import CampaignCreate, CampaignUpdate, CampaignResponse
from app.services import campaign_service

router = APIRouter()

# Send all campaigns
@router.get("/", response_model=List[CampaignResponse])
def get_all_campaigns(db: Session = Depends(get_db)):
    campaigns = campaign_service.get_campaigns(db)
    return campaigns

# campaign by ID
@router.get("/{campaign_id}", response_model=CampaignResponse)
def get_campaign_by_id(campaign_id: UUID, db: Session = Depends(get_db)):
    campaign = campaign_service.get_campaign(db, campaign_id)
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Campaign with id {campaign_id} not found"
        )
    return campaign

# Create campaign
@router.post("/", response_model=CampaignResponse, status_code=status.HTTP_201_CREATED)
def create_new_campaign(campaign_data: CampaignCreate, db: Session = Depends(get_db)):
    campaign = campaign_service.create_campaign(db, campaign_data)
    return campaign

# Update campaign
@router.put("/{campaign_id}", response_model=CampaignResponse)
def update_existing_campaign(
    campaign_id: UUID,
    campaign_data: CampaignUpdate,
    db: Session = Depends(get_db)
):
    campaign = campaign_service.update_campaign(db, campaign_id, campaign_data)
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Campaign with id {campaign_id} not found"
        )
    return campaign

# Delete campaign
@router.delete("/{campaign_id}")
def delete_campaign_by_id(campaign_id: UUID, db: Session = Depends(get_db)):
    success = campaign_service.delete_campaign(db, campaign_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Campaign with id {campaign_id} not found"
        )
    return {"message": "Campaign deleted successfully", "id": str(campaign_id)}