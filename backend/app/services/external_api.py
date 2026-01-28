import httpx
from typing import Dict

async def fetch_motivational_quote() -> Dict[str, str]:
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get("https://dummyjson.com/quotes/random")
            response.raise_for_status()
            data = response.json()

            # print(data)
            
            return {
                "quote": data.get("quote", ""),
                "author": data.get("author", "Unknown")
            }
    except Exception as e:
        return {
            "quote": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            "author": "Winston Churchill (Fallback)"
        }