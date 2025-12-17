import { Link } from 'react-router-dom';

/**
 * Header component with navigation
 * TODO: Add mobile menu toggle
 * TODO: Add user authentication state
 */
function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Release Plans
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/releases" 
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Browse Releases
            </Link>
            {/* TODO: Add dynamic page links from CMS */}
            {/* TODO: Add admin link for authenticated users */}
          </div>

          {/* TODO: Add mobile menu button */}
          <button className="md:hidden p-2">
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
