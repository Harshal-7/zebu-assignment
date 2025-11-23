"""
Posts API routes
"""
from flask import Blueprint, request
from services.post_service import get_all_posts, create_post
from utils.response import success_response, error_response
from utils.validators import validate_post_data

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/posts', methods=['GET'])
def get_posts():
    try:
        posts = get_all_posts()
        posts_data = [post.to_dict() for post in posts]
        
        return success_response(
            data=posts_data,
            message="Posts retrieved successfully"
        )
    except Exception as e:
        return error_response(
            message="Failed to retrieve posts",
            status_code=500
        )

@posts_bp.route('/posts', methods=['POST'])
def create_user_post():
    try:
        # Check if request has JSON data
        if not request.is_json:
            return error_response(
                message="Content-Type must be application/json",
                status_code=400
            )
        
        data = request.get_json()
        
        # Validate the incoming data
        is_valid, missing_fields, field_errors = validate_post_data(data)
        
        if not is_valid:
            error_msg = "Validation failed"
            if missing_fields:
                error_msg += f". Missing required fields: {', '.join(missing_fields)}"
            
            return error_response(
                message=error_msg,
                status_code=400,
                errors=field_errors if field_errors else None
            )
        
        # Create the post
        new_post = create_post(
            name=data['name'],
            username=data['username'],
            body=data['body']
        )
        
        return success_response(
            data=new_post.to_dict(),
            message="Post created successfully",
            status_code=201
        )
        
    except Exception as e:
        return error_response(
            message=f"Failed to create post: {str(e)}",
            status_code=500
        )

