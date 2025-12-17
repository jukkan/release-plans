# Release Plans Website

Modern web application for browsing Microsoft Power Platform and Dynamics 365 release plans.

## Project Structure

- `backend/` - Node.js + Express + Prisma API
- `frontend/` - React + Vite + Tailwind frontend

## Quick Start

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npx prisma migrate dev
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)

## Features

- Browse Microsoft release plans with advanced filtering
- Search and filter by product, date, investment area
- Responsive design for all devices
- Admin panel for content management
- CMS for pages and blog posts
- Automated sync with Microsoft's release data

## Tech Stack

### Backend
- Node.js + Express
- Prisma ORM
- MySQL
- JWT Authentication
- Rate limiting and security headers

### Frontend
- React 18
- Vite
- Tailwind CSS
- TanStack Query
- React Router

## Development

Both frontend and backend can be run simultaneously in development mode:

1. Start the backend server (port 3001)
2. Start the frontend dev server (port 5173)
3. Frontend proxies API requests to backend

## License

MIT

---

## Legacy Power BI Report

This repository also contains a Power BI report that pulls data from Microsoft's Release Planner website.

![Report image 1](/static/images/ReleasePlansReport1.png)

![Report image 2](/static/images/ReleasePlansReport2.png)

Feel free to [download](https://github.com/jukkan/release-plans/tree/main/report) a copy of the .pbix report and modify it for your own needs.
