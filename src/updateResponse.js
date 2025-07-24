let hal = require("hal");

/**
 * Build a HAL-formatted response after updating a resource
 * 
 * @param {string} moduleName - Name of the updated module/entity
 * @param {Object} updatedData - Updated resource data
 * @param {string} selfUrl - URL pointing to the updated resource
 * 
 * @returns {Object} HAL response with updated resource info
 */
export async function updateResponse(moduleName, updatedData, selfUrl) {
    const dataClone = JSON.parse(JSON.stringify(updatedData));
    return {
      success: true,
      _links: {
        self: { href: selfUrl }
      },
      name: moduleName,
      attributes: dataClone,
      message: `${moduleName} updated successfully`
    };
}