from flask import jsonify
from typing import Any, Optional

def success_response(data: Any = None, message: str = "Success", status_code: int = 200):
    """
    Create a standardized success response
    
    Args:
        data: Response data
        message: Success message
        status_code: HTTP status code
    
    Returns:
        JSON response with structure: { data: ..., message: ... }
    """
    response = {
        'message': message,
        'data': data
    }
    return jsonify(response), status_code

def error_response(message: str = "An error occurred", status_code: int = 400, errors: Optional[dict] = None):
    """
    Create a standardized error response
    
    Args:
        message: Error message
        status_code: HTTP status code
        errors: Optional dictionary of field-specific errors
    
    Returns:
        JSON response with structure: { message: ..., errors: ... }
    """
    response = {
        'message': message
    }
    if errors:
        response['errors'] = errors
    return jsonify(response), status_code

