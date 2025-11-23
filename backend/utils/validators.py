from typing import Dict, Any, List, Tuple

def validate_post_data(data: Dict[str, Any]) -> Tuple[bool, List[str], Dict[str, str]]:
    """
    Validate post creation data
    
    Args:
        data: Dictionary containing post data
    
    Returns:
        Tuple of (is_valid, missing_fields, field_errors)
    """
    required_fields = ['name', 'username', 'body',]
    missing_fields = []
    field_errors = {}

    # Check for missing required fields
    for field in required_fields:
        if field not in data:
            missing_fields.append(field)
        elif data[field] is None:
            missing_fields.append(field)
    
    # Validate field types and constraints
    if 'name' in data and not isinstance(data['name'], str):
        field_errors['name'] = 'Name must be a string'
    elif 'name' in data and len(data['name'].strip()) == 0:
        field_errors['name'] = 'Name cannot be empty'
    
    if 'username' in data and not isinstance(data['username'], str):
        field_errors['username'] = 'Username must be a string'
    elif 'username' in data and len(data['username'].strip()) == 0:
        field_errors['username'] = 'Username cannot be empty'
    
    if 'body' in data and not isinstance(data['body'], str):
        field_errors['body'] = 'Body must be a string'
    elif 'body' in data and len(data['body'].strip()) == 0:
        field_errors['body'] = 'Body cannot be empty'
    
    is_valid = len(missing_fields) == 0 and len(field_errors) == 0
    
    return is_valid, missing_fields, field_errors