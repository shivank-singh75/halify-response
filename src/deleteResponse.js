let hal = require("hal");

/**
 * Build a HAL-formatted response for a deleted resource
 * 
 * @param {string} moduleName - Name of the deleted module/entity
 * @param {string} selfUrl - URL pointing to the deleted resource 
 * 
 * @returns {Object} HAL response confirming deletion
 */
export async function deleteResponse(moduleName, selfUrl) {
  return {
    success: true,
    _links: {
      self: { href: selfUrl }
    },
    name: moduleName,
    message: `${moduleName} deleted successfully`
  };
}