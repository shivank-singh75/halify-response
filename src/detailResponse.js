let hal = require("hal");

/**
 * Build a HAL-formatted response for retrieving resource details
 * 
 * @param {string} resourceName - Name of the module/entity
 * @param {Object} data - Resource data object
 * @param {string} selfUrl - URL pointing to the resource
 * 
 * @returns {Object} HAL response with resource details
 */
export async function detailResponse(resourceName, data, selfUrl) {
    const dataClone = JSON.parse(JSON.stringify(data));
  
    return {
      _links: {
        self: { href: selfUrl }
      },
      attributes: dataClone,
      name: resourceName,
      success: true
    };
}