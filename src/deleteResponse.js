let hal = require("hal");

/**
 * Build a HAL-formatted response for a deleted resource
 * 
 * @param {string} resourceName - Name of the deleted module/entity
 * @param {string} selfUrl - URL pointing to the deleted resource (optional)
 * 
 * @returns {Object} HAL response confirming deletion
 */
export async function deleteResponse(resourceName, selfUrl = '') {
    const response = {
      success: true,
      message: `${resourceName} deleted successfully`
    };
    // Include _links.self if a URL is provided
    if (selfUrl) {
      response._links = {
        self: { href: selfUrl }
      };
    }
    return response;
}