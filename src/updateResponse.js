let hal = require("hal");

/**
 * Build a HAL-formatted response after updating a resource
 * 
 * @param {string} resourceName - Name of the updated module/entity
 * @param {Object} updatedData - Updated resource data
 * @param {string} selfUrl - URL pointing to the updated resource
 * 
 * @returns {Object} HAL response with updated resource info
 */
export async function updateResponse(resourceName, updatedData, selfUrl) {
    const dataClone = JSON.parse(JSON.stringify(updatedData));
    return {
      _links: {
        self: { href: selfUrl }
      },
      attributes: dataClone,
      name: resourceName,
      success: true,
      message: `${resourceName} updated successfully`
    };
}