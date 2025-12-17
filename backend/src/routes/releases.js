import express from 'express';
import prisma from '../config/database.js';

const router = express.Router();

/**
 * GET /api/releases
 * Get all release items with optional filtering
 * TODO: Implement filtering by product, date range, investment area
 */
router.get('/', async (req, res, next) => {
  try {
    // TODO: Implement query parameter parsing and filtering
    const releases = await prisma.releaseItem.findMany({
      take: 50,
      orderBy: { gaDate: 'desc' }
    });
    res.json({ data: releases, count: releases.length });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/releases/:id
 * Get a single release item by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const release = await prisma.releaseItem.findUnique({
      where: { id }
    });
    
    if (!release) {
      return res.status(404).json({ error: 'Release not found' });
    }
    
    res.json({ data: release });
  } catch (error) {
    next(error);
  }
});

export default router;
