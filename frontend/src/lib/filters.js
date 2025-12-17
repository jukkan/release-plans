/**
 * Filter utilities for release items
 */

/**
 * Filter releases by product name
 * @param {Array} releases - Array of release items
 * @param {string} productName - Product name to filter by
 * @returns {Array} Filtered releases
 */
export function filterByProduct(releases, productName) {
  if (!productName) return releases;
  return releases.filter(release => 
    release.productName.toLowerCase().includes(productName.toLowerCase())
  );
}

/**
 * Filter releases by investment area
 * @param {Array} releases - Array of release items
 * @param {string} investmentArea - Investment area to filter by
 * @returns {Array} Filtered releases
 */
export function filterByInvestmentArea(releases, investmentArea) {
  if (!investmentArea) return releases;
  return releases.filter(release => 
    release.investmentArea?.toLowerCase().includes(investmentArea.toLowerCase())
  );
}

/**
 * Filter releases by date range
 * @param {Array} releases - Array of release items
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Array} Filtered releases
 */
export function filterByDateRange(releases, startDate, endDate) {
  if (!startDate && !endDate) return releases;
  
  return releases.filter(release => {
    const gaDate = release.gaDate ? new Date(release.gaDate) : null;
    if (!gaDate) return false;
    
    if (startDate && gaDate < startDate) return false;
    if (endDate && gaDate > endDate) return false;
    
    return true;
  });
}

/**
 * Get unique product names from releases
 * @param {Array} releases - Array of release items
 * @returns {Array} Unique product names
 */
export function getUniqueProducts(releases) {
  const products = releases.map(r => r.productName);
  return [...new Set(products)].sort();
}

/**
 * Get unique investment areas from releases
 * @param {Array} releases - Array of release items
 * @returns {Array} Unique investment areas
 */
export function getUniqueInvestmentAreas(releases) {
  const areas = releases
    .map(r => r.investmentArea)
    .filter(Boolean);
  return [...new Set(areas)].sort();
}

/**
 * Apply all filters to releases
 * @param {Array} releases - Array of release items
 * @param {Object} filters - Filter object
 * @returns {Array} Filtered releases
 */
export function applyFilters(releases, filters) {
  let filtered = releases;
  
  if (filters.productName) {
    filtered = filterByProduct(filtered, filters.productName);
  }
  
  if (filters.investmentArea) {
    filtered = filterByInvestmentArea(filtered, filters.investmentArea);
  }
  
  if (filters.startDate || filters.endDate) {
    filtered = filterByDateRange(filtered, filters.startDate, filters.endDate);
  }
  
  return filtered;
}
