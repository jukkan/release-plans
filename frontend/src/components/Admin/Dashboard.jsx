/**
 * Admin dashboard component
 * TODO: Implement dashboard widgets and statistics
 * TODO: Add content management links
 * TODO: Add sync controls
 */
function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Card */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Releases</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
          <p className="text-sm text-gray-500 mt-1">TODO: Fetch from API</p>
        </div>

        {/* Stats Card */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Pages</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
          <p className="text-sm text-gray-500 mt-1">TODO: Fetch from API</p>
        </div>

        {/* Stats Card */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Last Sync</h3>
          <p className="text-3xl font-bold text-primary-600">N/A</p>
          <p className="text-sm text-gray-500 mt-1">TODO: Fetch from API</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <button className="btn-primary">
            Sync Release Data
          </button>
          <button className="btn-primary ml-3">
            Manage Content
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
