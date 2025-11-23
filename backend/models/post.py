from dataclasses import dataclass
from typing import Optional
from datetime import datetime

@dataclass
class Post:
    name: str
    username: str
    body: str
    likes: Optional[int] = 0
    comments: Optional[int] = 0
    shares: Optional[int] = 0
    id: Optional[int] = None
    created_at: Optional[datetime] = None
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username,
            'body': self.body,
            'likes': self.likes if self.likes else 0,
            'comments': self.comments if self.comments else 0,
            'shares': self.shares if self.shares else 0,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

