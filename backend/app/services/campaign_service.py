from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional

from app.models.campaign import Campaign
from app.schemas.campaign import CampaignCreate, CampaignUpdate

# all campaigns
def get_campaigns(db: Session) -> List[Campaign]:
    return db.query(Campaign).order_by(Campaign.created_at.desc()).all()

# campaign by ID
def get_campaign(db: Session, campaign_id: UUID) -> Optional[Campaign]:
    return db.query(Campaign).filter(Campaign.id == campaign_id).first()

# Create campaign
def create_campaign(db: Session, campaign_data: CampaignCreate) -> Campaign:
    campaign = Campaign(**campaign_data.model_dump())
    db.add(campaign)
    db.commit()
    db.refresh(campaign)
    return campaign

# update campaign
def update_campaign(
    db: Session,
    campaign_id: UUID,
    campaign_data: CampaignUpdate
) -> Optional[Campaign]:
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()
    if not campaign:
        return None
    
    update_data = campaign_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(campaign, field, value)
    
    db.commit()
    db.refresh(campaign)
    return campaign

# delete campaign
def delete_campaign(db: Session, campaign_id: UUID) -> bool:
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()
    if not campaign:
        return False
    
    db.delete(campaign)
    db.commit()
    return True