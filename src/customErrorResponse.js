/**
 * Build a custom error response with a single key-message pair
 * 
 * @param {string} fieldKey - The field or context key for the error
 * @param {string} message - The error message to display
 * 
 * @returns {Object} A structured error response object
 */
export async function customErrorResponse(fieldKey, message) {
    const response = {
      success: false,
      messages: {
        [fieldKey]: {
          msg: message
        }
      }
    };
    return response;
}