import { formatDate } from '../../lib/utils';

/**
 * Release detail component
 * Shows full details of a single release item
 * @param {Object} release - Release item data
 */
function ReleaseDetail({ release }) {
  if (!release) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Release not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {release.featureName}
        </h1>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
            {release.productName}
          </span>
          {release.investmentArea && (
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              {release.investmentArea}
            </span>
          )}
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {release.publicPreviewDate && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Public Preview</h3>
            <p className="text-lg font-semibold text-gray-900">
              {formatDate(release.publicPreviewDate)}
            </p>
          </div>
        )}
        {release.gaDate && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">General Availability</h3>
            <p className="text-lg font-semibold text-gray-900">
              {formatDate(release.gaDate)}
            </p>
          </div>
        )}
        {release.gaReleaseWave && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Release Wave</h3>
            <p className="text-lg font-semibold text-primary-600">
              {release.gaReleaseWave}
            </p>
          </div>
        )}
      </div>

      {/* Business Value */}
      {release.businessValue && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Business Value</h2>
          <p className="text-gray-700 leading-relaxed">{release.businessValue}</p>
        </div>
      )}

      {/* Feature Details */}
      {release.featureDetails && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Feature Details</h2>
          <p className="text-gray-700 leading-relaxed">{release.featureDetails}</p>
        </div>
      )}

      {/* Enabled For */}
      {release.enabledFor && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Enabled For</h2>
          <p className="text-gray-700">{release.enabledFor}</p>
        </div>
      )}

      {/* Geographic Areas */}
      {release.geographicAreas && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Geographic Areas</h2>
          <p className="text-gray-700">
            {/* TODO: Format JSON geographic areas data */}
            {JSON.stringify(release.geographicAreas)}
          </p>
        </div>
      )}
    </div>
  );
}

export default ReleaseDetail;
