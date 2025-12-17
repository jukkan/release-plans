# Release Plans Frontend

React + Vite + Tailwind CSS frontend for the Release Plans website.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Routing
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Zustand** - State management (auth)
- **React Markdown** - Markdown rendering
- **Fuse.js** - Fuzzy search
- **date-fns** - Date formatting
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env if needed (defaults should work for local development)
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   ├── components/         # React components
│   │   ├── Layout/        # Header, Footer, Layout
│   │   ├── ReleaseItems/  # Release-related components
│   │   ├── Content/       # Content page components
│   │   ├── Admin/         # Admin components
│   │   └── ui/            # Reusable UI components
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Home page
│   │   ├── ReleaseBrowser.jsx  # Release browsing page
│   │   ├── ContentPage.jsx     # Dynamic content pages
│   │   └── NotFound.jsx   # 404 page
│   ├── lib/               # Utility libraries
│   │   ├── api.js         # Axios instance and interceptors
│   │   ├── filters.js     # Filter utilities
│   │   └── utils.js       # General utilities
│   ├── hooks/             # Custom React hooks
│   │   ├── useReleases.js # Release data hooks
│   │   ├── useFilters.js  # Filter state management
│   │   └── useAuth.js     # Authentication hook
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
└── package.json
```

## Features

### Release Browser
- Browse all Microsoft release items
- Filter by product, investment area, and date range
- Search functionality with fuzzy matching
- Responsive grid layout

### Content Management
- Dynamic content pages from CMS
- Blog post support
- Markdown rendering
- SEO-friendly meta tags

### Admin Interface
- User authentication with JWT
- Dashboard with statistics
- Content page editor
- Release sync controls

## Development

### API Integration

The frontend communicates with the backend API via Axios. API configuration is in `src/lib/api.js`:

```javascript
import api from '@/lib/api';

// Example: Fetch releases
const response = await api.get('/releases');
```

The Vite dev server proxies `/api` requests to `http://localhost:3001` (configurable in `vite.config.js`).

### State Management

- **TanStack Query** - Server state (API data, caching, refetching)
- **Zustand** - Client state (authentication)
- **React hooks** - Local component state

### Styling

Using Tailwind CSS with custom configuration:
- Custom color palette (primary blue shades)
- Utility classes for common patterns
- Responsive design utilities

Component classes:
```css
.btn-primary - Primary button style
.card - Card container style
```

### Custom Hooks

**useReleases(filters)** - Fetch releases with filters
```javascript
const { data, isLoading, error } = useReleases({ productName: 'Power Apps' });
```

**useFilters(initialFilters)** - Manage filter state
```javascript
const { filters, updateFilter, resetFilters } = useFilters();
```

**useAuth()** - Authentication state and methods
```javascript
const { user, login, logout, isAuthenticated } = useAuth();
```

## Component Guidelines

### Component Structure
```jsx
/**
 * Component description
 * @param {Object} props - Component props
 */
function Component({ prop1, prop2 }) {
  // Hooks
  // State
  // Effects
  // Handlers
  // Render
  return <div>...</div>;
}

export default Component;
```

### Props Documentation
Use JSDoc comments to document component props and functionality.

### Naming Conventions
- Components: PascalCase (e.g., `ReleaseCard`)
- Files: PascalCase for components (e.g., `ReleaseCard.jsx`)
- Hooks: camelCase starting with 'use' (e.g., `useReleases`)
- Utilities: camelCase (e.g., `formatDate`)

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

Preview the production build:
```bash
npm run preview
```

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: `/api`)

All environment variables must be prefixed with `VITE_` to be exposed to the client.

## TODO

- [ ] Add loading skeletons for better UX
- [ ] Implement pagination for release lists
- [ ] Add more filter options (release wave, status)
- [ ] Implement advanced search with Fuse.js
- [ ] Add favorites/bookmarks functionality
- [ ] Add export functionality (CSV, PDF)
- [ ] Implement dark mode
- [ ] Add unit tests (Vitest)
- [ ] Add E2E tests (Playwright)
- [ ] Optimize bundle size
- [ ] Add PWA support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
