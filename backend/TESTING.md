# Testing the Release Items API

This document provides commands to test the Release Items API endpoints.

## Prerequisites

1. Set up your environment variables in `.env`:
   ```bash
   cp .env.example .env
   # Update DATABASE_URL with your MySQL credentials
   ```

2. Run database migrations:
   ```bash
   npm run prisma:migrate
   ```

3. Seed the database with sample data:
   ```bash
   npm run seed
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Get All Releases (with pagination)

```bash
# Get all releases (default pagination)
curl http://localhost:3001/api/releases

# Get first page with 10 items
curl "http://localhost:3001/api/releases?page=1&limit=10"
```

### Filter by Products

```bash
# Filter by single product
curl "http://localhost:3001/api/releases?products=Power%20Platform%20Power%20Apps"

# Filter by multiple products (comma-separated)
curl "http://localhost:3001/api/releases?products=Power%20Platform%20Power%20Apps,Dynamics%20365%20Customer%20Engagement"
```

### Filter by Investment Areas

```bash
# Filter by investment area
curl "http://localhost:3001/api/releases?investmentAreas=Finance"

# Filter by multiple investment areas
curl "http://localhost:3001/api/releases?investmentAreas=Finance,Customer%20Service"
```

### Filter by Release Wave

```bash
curl "http://localhost:3001/api/releases?releaseWave=2024%20Wave%201"
```

### Filter by GA Date Range

```bash
# Get releases with GA date from June 2024 onwards
curl "http://localhost:3001/api/releases?gaDateFrom=2024-06-01"

# Get releases with GA date up to August 2024
curl "http://localhost:3001/api/releases?gaDateTo=2024-08-31"

# Get releases within a date range
curl "http://localhost:3001/api/releases?gaDateFrom=2024-05-01&gaDateTo=2024-08-31"
```

### Search

```bash
# Search across feature name, business value, and feature details
curl "http://localhost:3001/api/releases?search=copilot"

# Search for AI-related features
curl "http://localhost:3001/api/releases?search=AI"
```

### Sorting

```bash
# Sort by GA date ascending
curl "http://localhost:3001/api/releases?sortBy=gaDate&sortOrder=asc"

# Sort by feature name descending
curl "http://localhost:3001/api/releases?sortBy=featureName&sortOrder=desc"

# Sort by product name
curl "http://localhost:3001/api/releases?sortBy=productName&sortOrder=asc"

# Sort by last updated
curl "http://localhost:3001/api/releases?sortBy=lastUpdated&sortOrder=desc"
```

### Combined Filters

```bash
# Multiple filters combined
curl "http://localhost:3001/api/releases?products=Power%20Platform%20Power%20Apps&search=copilot&sortBy=gaDate&sortOrder=asc"
```

### Get Single Release

```bash
# Get release by ID
curl http://localhost:3001/api/releases/test-001
```

### Get Statistics

```bash
# Get summary statistics
curl http://localhost:3001/api/releases/stats
```

Expected response:
```json
{
  "totalItems": 3,
  "products": [...],
  "investmentAreas": [...],
  "releaseWaves": [...],
  "lastSync": null
}
```

### Get Filter Options

```bash
# Get available filter options for dropdowns
curl http://localhost:3001/api/releases/filters
```

Expected response:
```json
{
  "products": [
    { "value": "...", "label": "...", "count": 1 }
  ],
  "investmentAreas": [...],
  "releaseWaves": [...]
}
```

## Using with jq (for pretty output)

```bash
# Pretty print JSON output
curl -s http://localhost:3001/api/releases | jq '.'

# Get just the items array
curl -s http://localhost:3001/api/releases | jq '.items'

# Get pagination metadata
curl -s http://localhost:3001/api/releases | jq '.pagination'

# Count number of items
curl -s http://localhost:3001/api/releases | jq '.items | length'
```

## Error Cases

### Invalid page number
```bash
curl "http://localhost:3001/api/releases?page=0"
# Returns 400 with validation error
```

### Invalid sort field
```bash
curl "http://localhost:3001/api/releases?sortBy=invalid"
# Returns 400 with validation error
```

### Non-existent release ID
```bash
curl http://localhost:3001/api/releases/non-existent-id
# Returns 404
```

## Health Check

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-12-17T12:00:00.000Z"
}
```
