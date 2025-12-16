# Emoji Tracker

A full-stack web application for tracking your daily moods using emojis. Built with Django REST Framework backend and React frontend (available in both Vite and Next.js versions).

## Features

- 📝 Add mood entries with emoji and reason
- ✏️ Edit existing mood entries
- 🗑️ Delete mood entries
- 📊 View all mood entries in a list
- 🎨 Modern, responsive UI with emoji picker
- 🔄 Real-time updates via REST API

## Tech Stack

### Backend
- **Django** 5.2.8 - Python web framework
- **Django REST Framework** 3.16.1 - REST API toolkit
- **django-cors-headers** - CORS handling for API requests

### Frontend Options

#### Option 1: React + Vite (frontend/)
- **React** 19.2.0 - UI library
- **React Router DOM** 7.10.1 - Client-side routing
- **Vite** - Build tool and dev server

#### Option 2: Next.js (frontend-next/)
- **Next.js** 15+ - React framework with SSR/SSG
- **React** 19+ - UI library
- Built-in routing and optimization

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python** 3.8 or higher
- **Node.js** 16 or higher and npm
- **pip** (Python package manager)

## Installation

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate

   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

   **Note:** If you encounter CORS-related errors, you may need to install `django-cors-headers`:
   ```bash
   pip install django-cors-headers
   ```

4. **Run database migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser (optional, for admin access):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Load sample data (optional):**
   ```bash
   python manage.py seed_november
   ```

### Frontend Setup (React + Vite)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Frontend Setup (Next.js)

1. **Navigate to the frontend-next directory:**
   ```bash
   cd frontend-next
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the `frontend-next` directory:
   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
   ```
   
   **Important:** This environment variable tells the Next.js frontend where to find the Django backend API.

## Running the Application

### Start the Backend Server

1. **Activate your virtual environment** (if not already activated):
   ```bash
   # On Windows
   cd backend
   venv\Scripts\activate

   # On macOS/Linux
   cd backend
   source venv/bin/activate
   ```

2. **Run the Django development server:**
   ```bash
   python manage.py runserver
   ```

   The backend API will be available at `http://127.0.0.1:8000`

### Start the Frontend Development Server

#### Option 1: React + Vite

1. **Open a new terminal** and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. **Start the Vite development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173` (or the port shown in the terminal)

#### Option 2: Next.js

1. **Open a new terminal** and navigate to the frontend-next directory:
   ```bash
   cd frontend-next
   ```

2. **Start the Next.js development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000` (or the port shown in the terminal)

3. **Open your browser** and navigate to the frontend URL to use the application.

**Note:** You only need to run ONE frontend at a time. Choose either the Vite or Next.js version based on your preference.

## Project Structure

```
Emoji Tracker/
├── backend/                 # Django backend
│   ├── emoji/              # Main app
│   │   ├── models.py       # Mood model
│   │   ├── views.py        # API views
│   │   ├── serializers.py  # DRF serializers
│   │   ├── routers.py      # API routing
│   │   └── urls.py         # URL patterns
│   ├── emoji_tracker/      # Django project settings
│   │   ├── settings.py     # Project configuration
│   │   └── urls.py         # Root URL configuration
│   ├── manage.py           # Django management script
│   ├── requirements.txt    # Python dependencies
│   └── db.sqlite3          # SQLite database
│
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── api.js          # API client functions
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   ├── components/     # Reusable components
│   │   │   ├── Layout.jsx
│   │   │   ├── MoodForm.jsx
│   │   │   └── MoodList.jsx
│   │   └── pages/          # Page components
│   │       ├── Home.jsx
│   │       ├── AddMood.jsx
│   │       └── EditMood.jsx
│   ├── package.json        # Node dependencies
│   └── vite.config.js      # Vite configuration
│
└── frontend-next/          # Next.js frontend
    ├── src/
    │   ├── app/            # App router pages
    │   │   ├── layout.js   # Root layout
    │   │   ├── page.js     # Home page
    │   │   ├── add/        # Add mood page
    │   │   └── edit/       # Edit mood page
    │   ├── components/     # Reusable components
    │   │   ├── MoodForm.jsx
    │   │   └── MoodList.jsx
    │   └── lib/
    │       └── api.js      # API client functions
    ├── .env.local          # Environment variables
    ├── package.json        # Node dependencies
    └── next.config.js      # Next.js configuration
```

## API Endpoints

The backend provides the following REST API endpoints:

### Mood Endpoints

- **GET** `/api/mood/` - List all mood entries (paginated)
- **POST** `/api/mood/` - Create a new mood entry
- **GET** `/api/mood/{id}/` - Retrieve a specific mood entry
- **PUT** `/api/mood/{id}/` - Update a mood entry
- **DELETE** `/api/mood/{id}/` - Delete a mood entry

### Request/Response Format

**Create/Update Mood:**
```json
{
  "emoji": "😀",
  "reason": "Had a great day!"
}
```

**Mood Response:**
```json
{
  "id": 1,
  "emoji": "😀",
  "reason": "Had a great day!",
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Available Emojis

The application supports the following emoji choices:
- 😀 (Happy)
- 🙂 (Content)
- 😐 (Neutral)
- 😢 (Sad)
- 😡 (Angry)
- 😴 (Tired)

## Development

### Backend Development

- **Run tests:**
  ```bash
  python manage.py test
  ```

- **Access Django admin:**
  Navigate to `http://127.0.0.1:8000/admin/` and log in with your superuser credentials.

- **Create new migrations:**
  ```bash
  python manage.py makemigrations
  python manage.py migrate
  ```

### Frontend Development

- **Run linter:**
  ```bash
  npm run lint
  ```

- **Build for production:**
  ```bash
  npm run build
  ```

- **Preview production build:**
  ```bash
  npm run preview
  ```

## Configuration

### Backend Configuration

The backend configuration is in `backend/emoji_tracker/settings.py`. Key settings:

- **CORS:** Currently allows all origins (`CORS_ALLOW_ALL_ORIGINS = True`). For production, configure specific allowed origins.
- **Database:** SQLite by default. For production, consider using PostgreSQL or MySQL.
- **Debug:** Set to `False` in production.

### Frontend Configuration

#### React + Vite
The API base URL is configured in `frontend/src/api.js`. Default is `http://127.0.0.1:8000`. Update this if your backend runs on a different host/port.

#### Next.js
The API base URL is configured via environment variables in `frontend-next/.env.local`:
```bash
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

**Important:** 
- Environment variables in Next.js must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser
- After changing `.env.local`, you must restart the Next.js dev server for changes to take effect
- Never commit `.env.local` to version control (it's gitignored by default)

## Troubleshooting

### Backend Issues

- **CORS errors:** Ensure `django-cors-headers` is installed and `CorsMiddleware` is in `MIDDLEWARE` in `settings.py`.
- **Database errors:** Run `python manage.py migrate` to apply migrations.
- **Port already in use:** Change the port with `python manage.py runserver 8001`

### Frontend Issues

#### React + Vite
- **Cannot connect to backend:** Ensure the backend server is running and the `BASE_URL` in `api.js` matches your backend URL.
- **Module not found:** Run `npm install` to install dependencies.
- **Port conflicts:** Vite will automatically use the next available port.

#### Next.js
- **"Unable to connect to server" error:** 
  - Ensure the backend server is running at `http://127.0.0.1:8000`
  - Check that `.env.local` has the correct `NEXT_PUBLIC_API_BASE_URL` value
  - Restart the Next.js dev server after changing environment variables
- **Environment variables not working:** 
  - Ensure the variable is prefixed with `NEXT_PUBLIC_`
  - Restart the dev server (environment variables are loaded at startup)
- **Module not found:** Run `npm install` to install dependencies.
- **Port conflicts:** Next.js will automatically use the next available port (usually 3000, 3001, etc.).


