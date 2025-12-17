import Header from './Header';
import Footer from './Footer';

/**
 * Main layout component
 * Wraps all pages with header and footer
 */
function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
