# Zebu Animation Studios - Assignment Project

## Assignment Description

This project implements a social media timeline API using Flask (backend) and Next.js (frontend). The assignment requires:

1. **GET Endpoint**: Fetch user posts similar to a social media timeline, returning posts with Name, username, and body
2. **POST Endpoint**: Create new user posts (data is hardcoded/in-memory, no database required)
3. **Frontend Integration**: Next.js page displaying posts with Tailwind CSS styling

## Setup Instructions

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Installation

1. **Create a virtual environment** (recommended):
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies**:
```bash
pip install -r requirements.txt
```

3. **Run the Flask server**:
```bash
python app.py
```

The API will be available at `http://localhost:3001`

## API Routes

### Base URL
```
http://localhost:3001/api
```

### 1. GET /api/posts

Fetch all user posts (social media timeline).

**Endpoint**: `GET /api/posts`

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Elon Musk",
      "username": "elonmusk",
      "body": "Perhaps our purpose is to make the mind of a sentient sun",
      "likes": 961,
      "comments": 386,
      "shares": 123,
      "created_at": "2024-01-15T10:30:00"
    }
  ]
}
```

### 2. POST /api/posts

Create a new user post.

**Endpoint**: `POST /api/posts`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "body": "This is my new post!"
}
```

**Success Response** (201 Created):
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "id": 4,
    "name": "John Doe",
    "username": "johndoe",
    "body": "This is my new post!",
    "likes": 0,
    "comments": 0,
    "shares": 0,
    "created_at": "2024-01-18T12:00:00"
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "message": "Validation failed. Missing required fields: name, username",
  "errors": {
    "name": "Name cannot be empty"
  }
}
```

## Project Structure

```
backend/
├── app.py                 # Flask application entry point
├── config.py              # Configuration settings
├── requirements.txt       # Python dependencies
├── models/
│   └── post.py           # Post data model
├── routes/
│   └── posts.py          # API route handlers
├── services/
│   └── post_service.py   # Business logic (in-memory storage)
└── utils/
    ├── response.py       # Response formatting utilities
    ├── validators.py     # Input validation
    └── error_handler.py  # Error handling middleware
```

## Frontend Integration

The backend is configured with CORS enabled to allow requests from the Next.js frontend. The frontend should:

- Make GET requests to `http://localhost:3001/api/posts` to fetch posts
- Make POST requests to `http://localhost:3001/api/posts` to create new posts
- Display posts in a timeline format using Tailwind CSS

## Features Implemented

- ✅ RESTful API endpoints
- ✅ Request validation
- ✅ Error handling with descriptive messages
- ✅ CORS support for frontend integration
- ✅ Clean code architecture (routes, services, models separation)
- ✅ Standardized API response format
- ✅ Database integration pseudo-code