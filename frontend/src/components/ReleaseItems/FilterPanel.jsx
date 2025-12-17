/**
 * Filter panel component
 * TODO: Implement filter controls for product, date range, investment area
 * @param {Object} filters - Current filter values
 * @param {Function} onFilterChange - Filter change handler
 */
function FilterPanel({ filters = {}, onFilterChange }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      <div className="space-y-4">
        {/* Product Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product
          </label>
          <select
            value={filters.productName || ''}
            onChange={(e) => onFilterChange('productName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Products</option>
            {/* TODO: Populate with dynamic product list */}
          </select>
        </div>

        {/* Investment Area Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Area
          </label>
          <select
            value={filters.investmentArea || ''}
            onChange={(e) => onFilterChange('investmentArea', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Areas</option>
            {/* TODO: Populate with dynamic investment areas */}
          </select>
        </div>

        {/* Date Range Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={filters.startDate || ''}
            onChange={(e) => onFilterChange('startDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={filters.endDate || ''}
            onChange={(e) => onFilterChange('endDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={() => onFilterChange('reset')}
          className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default FilterPanel;
