let hal = require("hal");

/**
 * Build a structured validation error response
 * 
 * @param {Array} errors - Array of validation error objects (e.g. from Ajv)
 * Each error object may include:
 *   - instancePath: string
 *   - keyword: string (e.g., "required", "pattern")
 *   - params: { missingProperty: string }
 *   - message: string
 * 
 * @returns {Object} A response object with error messages mapped to field names
 */
export async function validationErrorResponse(errors) {
    const response = {
      messages: {}
    };
  
    errors.forEach((error) => {
      let field = '';
  
      switch (error.keyword) {
        case 'required':
          field = error.params.missingProperty;
          break;
        case 'pattern':
        case 'type':
          field = error.instancePath.replace('/', '');
          break;
        default:
          field = error.params?.missingProperty || 'unknown';
          break;
      }
  
      response.messages[field] = {
        msg: error.message
      };
    });
  
    return response;
}