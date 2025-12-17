import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import ReleaseBrowser from './pages/ReleaseBrowser';
import ContentPage from './pages/ContentPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/releases" element={<ReleaseBrowser />} />
        <Route path="/page/:slug" element={<ContentPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
