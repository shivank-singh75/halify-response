/**
 * Build a HAL-formatted response for a created resource
 * 
 * @param {string} moduleName - Name of the created module/entity
 * @param {Object} createdData - The newly created resource data
 * @param {string} selfUrl - URL pointing to the created resource
 * 
 * @returns {Object} HAL-compliant response with created resource info
 */
export async function createResponse(moduleName, createdData, selfUrl) {
    const dataClone = JSON.parse(JSON.stringify(createdData));
  
    return {
      success: true,
      _links: {
        self: { href: selfUrl }
      },
      name: moduleName,
      attributes: dataClone,
      message: `${moduleName} created successfully`
    };
}