# Campaign Dashboard – Full Stack Application

This project is a simple campaign management system built as part of the Full Stack Developer demo task.
It allows users to manage marketing campaigns, view basic analytics, and see data from a third party API.

## Live URLs

- **Frontend:** https://frontend-assignment.nimje.org
- **Backend:** https://backend-assignment.nimje.org

## Frontend Setup (Next.js)

### Installation

Navigate to the frontend folder and install dependencies:

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the `frontend` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Run Frontend Locally

```bash
npm run dev
```

---

## Frontend Pages

- `/` – Dashboard with analytics and charts
- `/campaigns` – Campaign list with create option
- `/campaigns/create` – Create campaign form
- `/campaigns/[id]/edit` – Edit campaign form

---

## Backend Setup (FastAPI)

### Installation

Navigate to the backend folder:

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate

# Mac/Linux
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

### Environment Variables

Create a `.env` file in the backend root:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/campaign_db
CORS_ORIGINS=["http://localhost:3000"]
SECRET_KEY=secret-key
```

---

### Database & Migrations

Initialize Alembic (only required once):

```bash
alembic init alembic
```

Generate and apply migrations:

```bash
alembic revision --autogenerate -m "create campaigns table"
alembic upgrade head
```

---

### Run Backend Locally

```bash
uvicorn main:app --reload
```

---

## API Endpoints

### Campaign CRUD

- `GET /api/campaigns` – List all campaigns
- `GET /api/campaigns/{id}` – Get campaign details
- `POST /api/campaigns` – Create campaign
- `PUT /api/campaigns/{id}` – Update campaign
- `DELETE /api/campaigns/{id}` – Delete campaign

### Dashboard

- `GET /api/dashboard/stats` – Campaign statistics used for charts

### Third Party API

- `GET /api/external/quote` – Fetch a motivational quote
- `GET /api/external/trending-posts` – Fetch a trending posts

---

## Deployment Notes

- **Frontend** deployed on vps hosting
- **Backend** deployed on vps hosting
- **Database** hosted on Supabase PostgreSQL

---

## How to Test the Application

### CRUD Flow (UI)

1. Open the live frontend URL
2. Go to `/campaigns`
3. Create a new campaign
4. Edit the campaign
5. Delete the campaign
6. Refresh the page to confirm changes

### Dashboard / Visualization

- Open `/` (dashboard page)
- Charts update automatically based on campaign data

### Third Party API Feature

- Dashboard displays a motivational quote & trending posts
- Data is fetched from backend endpoint `/api/external/quote` and `/api/external/trending-posts`

---
