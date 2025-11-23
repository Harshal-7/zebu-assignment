# Flask Posts API

A clean, production-ready Flask REST API for managing user posts. This project demonstrates industry-standard backend practices including proper error handling, request validation, CORS support, and clean code organization.

## Features

- **GET /api/posts**: Fetch all user posts
- **POST /api/posts**: Create a new user post
- CORS enabled for frontend integration
- Comprehensive error handling
- Request validation
- Clean API response structure
- Scalable project architecture

## Project Structure

```
api/
├── app.py                 # Application entry point
├── config.py              # Configuration settings
├── requirements.txt       # Python dependencies
├── models/
│   └── post.py           # Post data model
├── routes/
│   └── posts.py          # Post API routes
├── services/
│   └── post_service.py   # Business logic layer
└── utils/
    ├── response.py       # Response utilities
    ├── validators.py     # Validation utilities
    └── error_handler.py  # Error handling
```

## Installation

1. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### GET /api/posts

Fetch all user posts.

**Response:**
```json
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "username": "johndoe",
      "body": "Just finished reading an amazing book...",
      "created_at": "2024-01-15T10:30:00"
    }
  ]
}
```

### POST /api/posts

Create a new user post.

**Request Body:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "body": "This is my new post!"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "id": 4,
    "name": "John Doe",
    "username": "johndoe",
    "body": "This is my new post!",
    "created_at": "2024-01-18T12:00:00"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed. Missing required fields: name, username",
  "errors": {
    "name": "Name cannot be empty"
  }
}
```

## Database Integration (Pseudo-code)

### PostgreSQL Schema

```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_username ON posts(username);
CREATE INDEX idx_created_at ON posts(created_at);
```

### Service Layer with Database (Pseudo-code)

```python
# services/post_service.py (Production version)

import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
from config import DATABASE_URL

@contextmanager
def get_db_connection():
    """Database connection context manager"""
    conn = psycopg2.connect(DATABASE_URL)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

def get_all_posts() -> List[Dict]:
    """
    Fetch all posts from PostgreSQL
    
    Returns:
        List of post dictionaries
    """
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                SELECT id, name, username, body, created_at, updated_at
                FROM posts
                ORDER BY created_at DESC
            """)
            return [dict(row) for row in cur.fetchall()]

def create_post(name: str, username: str, body: str) -> Dict:
    """
    Create a new post in PostgreSQL
    
    Args:
        name: User's name
        username: User's username
        body: Post content
    
    Returns:
        Created post dictionary
    """
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                INSERT INTO posts (name, username, body)
                VALUES (%s, %s, %s)
                RETURNING id, name, username, body, created_at, updated_at
            """, (name.strip(), username.strip(), body.strip()))
            
            result = cur.fetchone()
            return dict(result)
```

### Route Handler (Production version)

```python
# routes/posts.py (Production version with database)

@posts_bp.route('/posts', methods=['GET'])
def get_posts():
    """Fetch all posts from database"""
    try:
        posts = get_all_posts()  # Now fetches from PostgreSQL
        return success_response(
            data=posts,
            message="Posts retrieved successfully"
        )
    except psycopg2.Error as e:
        return error_response(
            message="Database error occurred",
            status_code=500
        )
```

## Real Backend Architecture

In a production environment, the architecture would include:

### 1. **Database Layer**
   - PostgreSQL for persistent data storage
   - Connection pooling (e.g., SQLAlchemy with connection pooling)
   - Database migrations (Alembic)
   - Read replicas for scaling reads

### 2. **Application Layer**
   - **Models**: SQLAlchemy ORM models for database interaction
   - **Services**: Business logic separated from routes
   - **Repositories**: Data access abstraction layer
   - **DTOs**: Data Transfer Objects for API contracts

### 3. **API Layer**
   - **Routes**: RESTful endpoints organized by resource
   - **Middleware**: Authentication, logging, rate limiting
   - **Serializers**: Request/response validation and transformation
   - **Error Handling**: Centralized exception handling

### 4. **Infrastructure**
   - **Caching**: Redis for frequently accessed data
   - **Message Queue**: RabbitMQ/Kafka for async processing
   - **API Gateway**: Rate limiting, authentication, routing
   - **Load Balancer**: Distribute traffic across instances

### 5. **Security**
   - **Authentication**: JWT tokens or OAuth2
   - **Authorization**: Role-based access control (RBAC)
   - **Input Sanitization**: SQL injection prevention, XSS protection
   - **HTTPS**: TLS/SSL encryption
   - **Rate Limiting**: Prevent abuse

### 6. **Observability**
   - **Logging**: Structured logging (JSON format)
   - **Monitoring**: Application metrics (Prometheus)
   - **Tracing**: Distributed tracing (Jaeger)
   - **Alerting**: Error and performance alerts

### 7. **Testing**
   - **Unit Tests**: Test individual components
   - **Integration Tests**: Test API endpoints with test database
   - **E2E Tests**: Full workflow testing
   - **Load Tests**: Performance and scalability testing

### 8. **Deployment**
   - **Containerization**: Docker containers
   - **Orchestration**: Kubernetes for scaling
   - **CI/CD**: Automated testing and deployment
   - **Environment Management**: Dev, staging, production

### Example Production Structure

```
api/
├── app/
│   ├── __init__.py
│   ├── models/          # SQLAlchemy models
│   ├── schemas/         # Pydantic schemas for validation
│   ├── repositories/    # Data access layer
│   ├── services/        # Business logic
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth, logging, etc.
│   └── utils/           # Utilities
├── migrations/          # Alembic migrations
├── tests/               # Test suite
├── docker/              # Docker configs
├── .env.example
├── requirements.txt
└── README.md
```

## Best Practices Implemented

1. **Separation of Concerns**: Routes, services, and models are separated
2. **Error Handling**: Comprehensive error handling with descriptive messages
3. **Validation**: Input validation before processing
4. **CORS**: Enabled for frontend integration
5. **RESTful Design**: Follows REST conventions
6. **Consistent API Responses**: Standardized response structure
7. **Code Organization**: Clean folder structure
8. **Type Hints**: Type annotations for better code clarity

## Testing

Example test cases:

```python
# tests/test_posts.py

def test_get_posts(client):
    response = client.get('/api/posts')
    assert response.status_code == 200
    assert response.json['success'] == True
    assert 'data' in response.json

def test_create_post_success(client):
    data = {
        'name': 'Test User',
        'username': 'testuser',
        'body': 'Test post content'
    }
    response = client.post('/api/posts', json=data)
    assert response.status_code == 201
    assert response.json['success'] == True

def test_create_post_missing_fields(client):
    data = {'name': 'Test User'}
    response = client.post('/api/posts', json=data)
    assert response.status_code == 400
    assert response.json['success'] == False
```

## License

This is an interview assignment project.

