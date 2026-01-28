import httpx
from typing import Dict

# fetch trending posts
async def fetch_trending_posts() -> Dict:
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(
                "https://dummyjson.com/posts/search?q=work&limit=4"
            )
            response.raise_for_status()
            # print(response.json())
            return response.json()
    except Exception as e:
        print(f"Error fetching posts: {e}")
        return {"posts": [], "total": 0, "limit": 4}