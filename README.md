# ShadoWEB (English Shadowing Application)

This is a two-layer web application designed for practicing English pronunciation via "Shadowing". The application fetching video datasets and keeps track of user study statistics.

## Tech Stack
- **Frontend:** React.js (Vite), Vanilla CSS (Glassmorphism UI), Axios
- **Backend:** Node.js (Express.js), Mongoose
- **Database:** MongoDB
- **Video Storage:** Amazon S3 (Placeholder URLs initially)

## Getting Started

### 1. Database Setup
Make sure you have MongoDB running locally, or replace `MONGO_URI` in your backend `.env` file with a MongoDB Atlas cluster URI.

### 2. Backend Setup
```bash
cd backend
npm install
# Seed the database with mock video entries
npm run seed
# Start the server (runs on port 5000 by default)
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Start Vite development server
npm run dev
```

## Features
- **Video Player:** Play English videos and toggle subtitles (Shadowing practice).
- **Activity Log:** Automatically saves your watched activity when a video finishes playing.
- **Dashboard:** Tracks your total watch count and the days you have actively studied.

## Note on 'Fast Mode'
For display and development speed, standard user authentication was bypassed, utilizing a dummy user ID to log all interactions directly. In production, this can be easily wrapped with JWT/OAuth logic.
