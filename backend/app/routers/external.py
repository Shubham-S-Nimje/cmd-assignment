from fastapi import APIRouter

from app.services import external_api, posts_service

router = APIRouter()

# Sending quote
@router.get("/quote")
async def get_motivational_quote():
    quote_data = await external_api.fetch_motivational_quote()
    return quote_data

# trending posts
@router.get("/trending-posts")
async def get_trending_posts():
    return await posts_service.fetch_trending_posts()