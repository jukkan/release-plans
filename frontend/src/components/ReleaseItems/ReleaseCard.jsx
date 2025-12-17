import { formatDate } from '../../lib/utils';

/**
 * Individual release card component
 * @param {Object} release - Release item data
 */
function ReleaseCard({ release }) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {release.featureName}
        </h3>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center">
          <span className="text-gray-500 w-24">Product:</span>
          <span className="text-gray-900 font-medium">{release.productName}</span>
        </div>

        {release.investmentArea && (
          <div className="flex items-center">
            <span className="text-gray-500 w-24">Area:</span>
            <span className="text-gray-700">{release.investmentArea}</span>
          </div>
        )}

        {release.gaDate && (
          <div className="flex items-center">
            <span className="text-gray-500 w-24">GA Date:</span>
            <span className="text-gray-900 font-medium">
              {formatDate(release.gaDate)}
            </span>
          </div>
        )}

        {release.gaReleaseWave && (
          <div className="flex items-center">
            <span className="text-gray-500 w-24">Wave:</span>
            <span className="text-primary-600 font-medium">
              {release.gaReleaseWave}
            </span>
          </div>
        )}
      </div>

      {release.businessValue && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 line-clamp-2">
            {release.businessValue}
          </p>
        </div>
      )}

      {/* TODO: Add link to detail view */}
    </div>
  );
}

export default ReleaseCard;
