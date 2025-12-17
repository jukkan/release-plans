import express from 'express';
import * as releaseService from '../services/releaseService.js';
import { validateReleaseQuery } from '../middleware/validation.js';

const router = express.Router();

/**
 * GET /api/releases/stats
 * Get summary statistics
 */
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await releaseService.getReleaseStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/releases/filters
 * Get available filter options
 */
router.get('/filters', async (req, res, next) => {
  try {
    const filters = await releaseService.getFilterOptions();
    res.json(filters);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/releases
 * Query params:
 *   - page (number): Page number
 *   - limit (number): Items per page
 *   - products (string): Comma-separated product names
 *   - investmentAreas (string): Comma-separated investment areas
 *   - search (string): Search term
 *   - gaDateFrom (string): GA date from (YYYY-MM-DD)
 *   - gaDateTo (string): GA date to (YYYY-MM-DD)
 *   - releaseWave (string): Release wave filter
 *   - sortBy (string): Sort field
 *   - sortOrder (string): asc or desc
 */
router.get('/', validateReleaseQuery, async (req, res, next) => {
  try {
    // Parse comma-separated query params
    const options = {
      page: req.query.page,
      limit: req.query.limit,
      products: req.query.products ? req.query.products.split(',').map(p => p.trim()).filter(p => p) : [],
      investmentAreas: req.query.investmentAreas ? req.query.investmentAreas.split(',').map(ia => ia.trim()).filter(ia => ia) : [],
      search: req.query.search,
      gaDateFrom: req.query.gaDateFrom,
      gaDateTo: req.query.gaDateTo,
      releaseWave: req.query.releaseWave,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
    };

    const result = await releaseService.getReleases(options);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/releases/:id
 * Get single release item
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const release = await releaseService.getReleaseById(id);
    
    if (!release) {
      return res.status(404).json({ error: 'Release not found' });
    }
    
    res.json(release);
  } catch (error) {
    next(error);
  }
});

export default router;
