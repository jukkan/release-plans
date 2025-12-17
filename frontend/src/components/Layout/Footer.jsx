import { Link } from 'react-router-dom';

/**
 * Footer component
 * TODO: Add dynamic footer links from CMS
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-400 text-sm">
              Browse and explore Microsoft Power Platform and Dynamics 365 release plans.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/releases" className="text-gray-400 hover:text-white transition-colors">
                  Browse Releases
                </Link>
              </li>
              {/* TODO: Add more dynamic links */}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://releaseplans.microsoft.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Microsoft Release Plans
                </a>
              </li>
              {/* TODO: Add more resource links */}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Release Plans. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
