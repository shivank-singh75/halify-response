/**
 * Build a paginated HAL-style response object
 * 
 * @param {string} moduleName - The name of the resource/module (used in the "name" field)
 * @param {Array} dataList - The array of data items to include in the response
 * @param {string} selfUrl - The current page URL (self link)
 * @param {string} firstPageUrl - URL of the first page
 * @param {string} lastPageUrl - URL of the last page
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @param {number} itemsPerPage - Number of items per page
 * @param {number} totalItems - Total number of items across all pages
 * 
 * @returns {Object} - A structured HAL-formatted response object with pagination metadata
 */
export async function paginatedResponse(moduleName, dataArr, selfUrl, firstUrl, lastUrl, page, pageCount, pageSize, total) {
    // Clone the data to avoid mutation
    const clonedDataList = JSON.parse(JSON.stringify(dataArr));
  
    // Prepare HAL-like response structure
    const response = {
      success: true,
      name: moduleName,
      _embedded: {
        data: clonedDataList
      },
      _links: {
        self: { href: selfUrl },
        first: { href: firstUrl },
        last: { href: lastUrl }
      },
      page: page,
      pageCount: pageCount,
      pageSize: pageSize,
      total: total,
    };
  
    return response;
}