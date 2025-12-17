import { useState } from 'react';
import { useReleases } from '../hooks/useReleases';
import { useFilters, useSearch } from '../hooks/useFilters';
import ReleaseList from '../components/ReleaseItems/ReleaseList';
import FilterPanel from '../components/ReleaseItems/FilterPanel';
import SearchBar from '../components/ReleaseItems/SearchBar';

/**
 * Release browser page
 * Main page for browsing and filtering releases
 */
function ReleaseBrowser() {
  const { filters, updateFilter, resetFilters } = useFilters();
  const { data, isLoading, error } = useReleases(filters);
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(
    data?.data || [],
    ['featureName', 'productName', 'investmentArea']
  );

  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      resetFilters();
    } else {
      updateFilter(key, value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Browse Releases
        </h1>
        <p className="text-lg text-gray-600">
          Explore Microsoft Power Platform and Dynamics 365 release plans
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar 
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by feature name, product, or area..."
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <FilterPanel 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>

        {/* Release List */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              {filteredItems.length} release{filteredItems.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          <ReleaseList 
            releases={filteredItems}
            loading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default ReleaseBrowser;
