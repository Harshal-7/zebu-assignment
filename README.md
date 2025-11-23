# Social Media Timeline – Zebu Animation Studios Assignment

This monorepo contains a simple social media timeline application built with:

- **Backend:** Flask (Python)
- **Frontend:** Next.js (React + TypeScript)

The app allows users to **view** and **create** posts in a social media feed format. Data is stored **in-memory** (no database) as per assignment requirements.


## Project Overview

### Features

- 🧾 **Timeline View** – Fetch and display posts (Name, username, body, meta info)
- ✍️ **Create Posts** – Add new posts via a POST API
- ⚙️ **REST API** – Clean, RESTful endpoints with validation & error handling
- 🌐 **CORS Enabled** – Backend accepts requests from the Next.js frontend
- 🎨 **Modern UI** – Tailwind CSS, icons, toasts, and a Twitter-like layout
- 📦 **Clean Architecture** – Separation of routes, services, models, and utils


## Getting Started

### 1. Backend (Flask)

#### Prerequisites

* Python **3.7+**
* `pip`

#### Setup & Run

```bash
cd backend

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```

By default, the backend will be available at:

```text
http://localhost:3001
```

#### API Base URL

```text
http://localhost:3001/api
```

**Endpoints:**

* `GET /api/posts` – Fetch all posts (timeline)
* `POST /api/posts` – Create a new post

Both endpoints return standardized JSON responses with `success`, `message`, and `data` fields.

---

### 2. Frontend (Next.js)

#### Prerequisites

* Node.js **18+**
* `npm` or `yarn`

#### Setup & Run

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.local.example .env.local  # if you have a template, otherwise create manually
```

In `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Then run the dev server:

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:3000
```

## Running Both Together

1. Start **backend**:

   ```bash
   cd backend
   python app.py
   ```

2. Start **frontend** in a second terminal:

   ```bash
   cd frontend
   npm run dev
   ```

3. Visit `http://localhost:3000` to use the app.
   The frontend will call `http://localhost:3001/api/posts` for data.

