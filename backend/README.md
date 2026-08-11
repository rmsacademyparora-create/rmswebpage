# RMS Academy Backend

Small Node.js + Express API for the RMS Academy login project.

## Run locally

```bash
cd backend
npm install
npm start
```

API: `http://localhost:5000`

## Endpoints

- `GET /api/health` — API health check
- `POST /api/login` — login and receive a JWT
- `GET /api/profile` — protected profile endpoint

Demo credentials:

- username: `admin`
- password: `admin123`

The demo user is intentionally in memory for learning. For a real application, move users to MongoDB and hash passwords before production use.

## Frontend connection

The root frontend calls `/api/login` by default, so it works naturally when frontend and backend are served from the same origin. If the frontend is hosted separately (for example GitHub Pages), set `window.API_BASE_URL` before `script.js` to the deployed backend URL.
