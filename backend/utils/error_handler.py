from flask import jsonify
from utils.response import error_response

def register_error_handlers(app):
    @app.errorhandler(404)
    def not_found(error):
        return error_response("Resource not found", 404)
    
    @app.errorhandler(405)
    def method_not_allowed(error):
        return error_response("Method not allowed", 405)
    
    @app.errorhandler(500)
    def internal_error(error):
        return error_response("Internal server error", 500)
    
    @app.errorhandler(ValueError)
    def handle_value_error(error):
        return error_response(str(error), 400)
    
    @app.errorhandler(KeyError)
    def handle_key_error(error):
        return error_response(f"Missing required field: {str(error)}", 400)

