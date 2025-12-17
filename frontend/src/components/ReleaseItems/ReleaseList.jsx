import ReleaseCard from './ReleaseCard';

/**
 * Release list component
 * Displays a grid of release cards
 * @param {Array} releases - Array of release items
 * @param {boolean} loading - Loading state
 * @param {Error} error - Error object
 */
function ReleaseList({ releases = [], loading = false, error = null }) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="mt-4 text-gray-600">Loading releases...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-900 font-medium">Error loading releases</p>
        <p className="text-gray-600 mt-2">{error.message}</p>
      </div>
    );
  }

  if (!releases || releases.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No releases found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {releases.map((release) => (
        <ReleaseCard key={release.id} release={release} />
      ))}
    </div>
  );
}

export default ReleaseList;
