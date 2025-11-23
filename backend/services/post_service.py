from typing import List
from models.post import Post
from datetime import datetime

_posts_storage: List[Post] = [
    Post(
        id=1,
        name="Elon Musk",
        username="elonmusk",
        body="Perhaps our purpose is to make the mind of a sentient sun",
        likes=961,
        comments=386,
        shares=123,
        created_at=datetime(2024, 1, 15, 10, 30, 0)
    ),
    Post(
        id=2,
        name="John Bobby",
        username="john_bobby",
        body="Today I learned about RESTful API design principles. Clean code and proper error handling make all the difference.",
        likes=67,
        comments=12,
        shares=0,
        created_at=datetime(2024, 1, 17, 9, 15, 0)
    ),
    Post(
        id=3,
        name="Sam Altman",
        username="sama",
        body="Just finished reading an amazing book on software architecture! Highly recommend it.",
        likes=944,
        comments=123,
        shares=70,
        created_at=datetime(2024, 1, 16, 14, 20, 0)
    ),
]

def get_all_posts() -> List[Post]:
    # PostgreSQL Pseudo-code:
    # Using psycopg2 or SQLAlchemy
    # with get_db_connection() as conn:
    #     with conn.cursor(cursor_factory=RealDictCursor) as cur:
    #         cur.execute('''
    #             SELECT id, name, username, body, created_at
    #             FROM posts
    #             ORDER BY created_at DESC
    #         ''')
    #         rows = cur.fetchall()
    #         return [Post(**dict(row)) for row in rows]
    return _posts_storage.copy()

def create_post(name: str, username: str, body: str) -> Post:
    # PostgreSQL Pseudo-code:
    # Using psycopg2 or SQLAlchemy
    # with get_db_connection() as conn:
    #     with conn.cursor(cursor_factory=RealDictCursor) as cur:
    #         cur.execute('''
    #             INSERT INTO posts (name, username, body, created_at)
    #             VALUES (%s, %s, %s, CURRENT_TIMESTAMP)
    #             RETURNING id, name, username, body, created_at, updated_at
    #         ''', (name.strip(), username.strip(), body.strip()))
    #         row = cur.fetchone()
    #         return Post(**dict(row))
    # Generate a simple ID (in production, this would come from the database)
    
    new_id = max([p.id for p in _posts_storage], default=0) + 1
    
    new_post = Post(
        id=new_id,
        name=name.strip(),
        username=username.strip(),
        body=body.strip(),
        created_at=datetime.now()
    )
    
    _posts_storage.append(new_post)
    return new_post

