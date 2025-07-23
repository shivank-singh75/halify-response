let hal = require("hal");

/**
 * Send a HAL-formatted success response
 * 
 * @param {Object} res - Express response object
 * @param {String|Object} message - Message or template describing the success response
 * @param {Number} httpStatusCode - Optional HTTP status code (default: 200)
 * @param {Object|null} attributes - Optional additional data to include in the response
 * 
 * @returns {Object} - Express response in HAL-compliant format
 */
export function successResponse(res, message, httpStatusCode = 200, attributes = null) {
    const responseBody = {
        messages: message
    };

    // Attach extra attributes if provided
    if (attributes !== null) {
        responseBody.attributes = attributes;
    }

    // Create HAL resource with current URL as self link
    const halFormattedResponse = new hal.Resource(responseBody, res.url);

    // Send JSON response with specified HTTP status
    return res.status(httpStatusCode).json(halFormattedResponse);
}