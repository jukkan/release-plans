import ReactMarkdown from 'react-markdown';

/**
 * Page renderer component
 * Renders content pages with markdown support
 * @param {Object} page - Content page data
 */
function PageRenderer({ page }) {
  if (!page) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Page not found</p>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-lg shadow-md p-8">
      {/* Header */}
      <header className="border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {page.title}
        </h1>
        
        {page.publishedAt && (
          <div className="flex items-center text-sm text-gray-500">
            <span>Published on {new Date(page.publishedAt).toLocaleDateString()}</span>
            {page.author && (
              <>
                <span className="mx-2">•</span>
                <span>By {page.author.name || page.author.email}</span>
              </>
            )}
          </div>
        )}
      </header>

      {/* Featured Image */}
      {page.featuredImage && (
        <div className="mb-8">
          <img 
            src={page.featuredImage} 
            alt={page.title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {page.markdownContent ? (
          <ReactMarkdown>{page.markdownContent}</ReactMarkdown>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        )}
      </div>

      {/* Meta Information */}
      {page.updatedAt && (
        <footer className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Last updated: {new Date(page.updatedAt).toLocaleDateString()}
          </p>
        </footer>
      )}
    </article>
  );
}

export default PageRenderer;
