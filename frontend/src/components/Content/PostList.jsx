import { Link } from 'react-router-dom';
import { formatDate, truncate } from '../../lib/utils';

/**
 * Post list component
 * Displays a list of blog posts
 * @param {Array} posts - Array of post items
 */
function PostList({ posts = [] }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="md:flex">
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="md:w-1/3">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
            )}
            
            {/* Content */}
            <div className="p-6 md:flex-1">
              <Link to={`/page/${post.slug}`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                  {post.title}
                </h2>
              </Link>
              
              {post.publishedAt && (
                <p className="text-sm text-gray-500 mb-3">
                  {formatDate(post.publishedAt)}
                </p>
              )}
              
              {post.excerpt && (
                <p className="text-gray-700 mb-4">
                  {truncate(post.excerpt, 200)}
                </p>
              )}
              
              <Link 
                to={`/page/${post.slug}`}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                Read more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default PostList;
