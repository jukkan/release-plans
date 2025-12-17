# Release Plans Backend API

Node.js + Express + Prisma backend for the Release Plans website.

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Prisma** - ORM for database access
- **MySQL** - Database
- **JWT** - Authentication
- **Joi** - Validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials and configuration
```

3. Generate Prisma client:
```bash
npm run prisma:generate
```

4. Run database migrations:
```bash
npm run prisma:migrate
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Public Endpoints

#### Health Check
- `GET /health` - Health check endpoint

#### Releases
- `GET /api/releases` - Get all release items (paginated, with filters)
- `GET /api/releases/:id` - Get a single release item

#### Content
- `GET /api/content/pages` - Get all published pages
- `GET /api/content/posts` - Get all published posts
- `GET /api/content/:slug` - Get content by slug

#### Authentication
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/logout` - Logout (client-side token removal)
- `GET /api/auth/me` - Get current user info (requires authentication)

### Protected Endpoints (Admin)

All admin endpoints require authentication with a valid JWT token.

#### Admin - Sync
- `POST /api/admin/releases/sync` - Trigger manual sync of release data

#### Admin - Content Management
- `GET /api/admin/content` - Get all content pages (including drafts)
- `POST /api/admin/content` - Create a new content page
- `PUT /api/admin/content/:id` - Update a content page
- `DELETE /api/admin/content/:id` - Delete a content page

#### Admin - Logs
- `GET /api/admin/sync-logs` - Get sync history

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.js  # Prisma client instance
│   │   └── index.js     # App configuration
│   ├── routes/          # API route handlers
│   │   ├── releases.js  # Release endpoints
│   │   ├── content.js   # Content endpoints
│   │   ├── auth.js      # Authentication endpoints
│   │   └── admin.js     # Admin endpoints
│   ├── services/        # Business logic
│   │   ├── releaseSync.js   # Release data sync service
│   │   ├── contentService.js # Content management service
│   │   └── authService.js    # Authentication service
│   ├── middleware/      # Express middleware
│   │   ├── auth.js      # JWT authentication
│   │   ├── validation.js # Request validation
│   │   └── errorHandler.js # Error handling
│   ├── prisma/          # Database schema
│   │   └── schema.prisma # Prisma schema definition
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Database Schema

### Models

- **ReleaseItem** - Microsoft release plan items
- **ContentPage** - CMS pages and blog posts
- **User** - Admin and editor users
- **Setting** - Application settings
- **SyncLog** - Sync operation history

See `src/prisma/schema.prisma` for detailed schema definition.

## Development

### Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:deploy` - Deploy migrations to production

### Environment Variables

See `.env.example` for all available environment variables.

Required variables:
- `DATABASE_URL` - MySQL connection string
- `JWT_SECRET` - Secret key for JWT signing
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

## Security

- Rate limiting on API endpoints (100 requests per 15 minutes)
- Helmet.js for security headers
- CORS configuration
- JWT-based authentication
- Password hashing with bcrypt
- Input validation with Joi

## Error Handling

All errors are handled by the global error handler middleware, which returns consistent JSON responses:

```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Get a token by calling `POST /api/auth/login` with valid credentials.

## TODO

- [ ] Implement release data sync from Microsoft API
- [ ] Add more comprehensive filtering for releases
- [ ] Add search functionality
- [ ] Add pagination helpers
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Add unit and integration tests
- [ ] Add logging service (Winston)
- [ ] Add caching (Redis)

## License

MIT
