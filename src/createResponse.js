let hal = require("hal");

/**
 * Build a HAL-formatted response for a created resource
 * 
 * @param {string} resourceName - Name of the created module/entity
 * @param {Object} createdData - The newly created resource data
 * @param {string} selfUrl - URL pointing to the created resource
 * 
 * @returns {Object} HAL-compliant response with created resource info
 */
export async function createResponse(resourceName, createdData, selfUrl) {
    const dataClone = JSON.parse(JSON.stringify(createdData));
  
    return {
      _links: {
        self: { href: selfUrl }
      },
      attributes: dataClone,
      name: resourceName,
      success: true,
      message: `${resourceName} created successfully`
    };
}