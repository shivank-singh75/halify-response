let hal = require("hal");

/**
 * Send a HAL-formatted success response
 * 
 * @param {string} moduleName - Name of the updated module/entity
 * @param {String} message - Message or template describing the success response
 * @param {string} selfUrl - URL pointing to the updated resource
 * @param {Object|null} attributes - Optional additional data to include in the response
 * @returns {Object} - Express response in HAL-compliant format
 */
export function successResponse(moduleName, message, selfUrl, attributes=null) {
    const response = {
        success: true,
        _links: {
            self: { href: selfUrl }
        },
        name: moduleName,
        message: message
    }
    if(attributes){
        response.attributes = attributes;
    }

    response.message = message;
}