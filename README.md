# Lost and Found - College Project

A React + Tailwind CSS frontend for a Lost and Found system, now connected to
a real Express + TypeScript + MongoDB backend (no more dummy data — data
comes live from the API).

## Pages
1. **Login / Sign Up Page** — real authentication against the backend (JWT).
2. **Feed Page** — shows lost/found posts from the database, users can:
   - Create a new post
   - Like / react to a post
   - Add comments to a post

## Tech Used
- React (Vite)
- React Router DOM
- Tailwind CSS
- Fetch API calls to an Express + MongoDB backend (see `src/api.js`)

## Connecting to the Backend
This frontend expects the "Lost & Found" backend (Express + TS + MongoDB) to
be running and reachable. Set its URL in a `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

If you deploy the backend to Vercel, change this to your deployed URL, e.g.
```
VITE_API_URL=https://your-backend-project.vercel.app/api
```

**Note:** Vite only reads `.env` values at build/start time, so restart
`npm run dev` after changing it.

## How to Run This Project

### 1. Install Node.js
Make sure Node.js (v16 or higher) is installed on your computer.
Check by running:
```
node -v
```
If not installed, download it from https://nodejs.org

### 2. Extract the project
Unzip the folder you downloaded (`lost-and-found-app.zip`).

### 3. Open terminal in the project folder
```
cd lost-and-found-app
```

### 4. Install dependencies
```
npm install
```

### 5. Set up the backend URL
```
cp .env.example .env
```
Make sure the backend server (Express + MongoDB) is already running — see
the backend project's README for setup instructions.

### 6. Run the project
```
npm run dev
```

Vite will start a local server, usually at:
```
http://localhost:5173
```

Open that link in your browser.

### 7. Sign up / Login
Since this now talks to a real backend, you need to **Sign Up** first with a
real name, email, and password. After that, you can log in with the same
credentials any time. You'll be redirected to the Feed page automatically.

## Notes
- Posts, likes, and comments are now stored in MongoDB via the backend —
  refreshing the page will NOT reset your data anymore.
- Your login session is saved in the browser (localStorage), so you'll stay
  logged in even after refreshing, until you click Logout.
- If posts don't load, check that the backend is running and that
  `VITE_API_URL` in `.env` points to the correct address.
