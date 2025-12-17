import express from 'express';
import prisma from '../config/database.js';

const router = express.Router();

/**
 * Admin routes - all routes require authentication
 * TODO: Add auth middleware to protect these routes
 */

/**
 * GET /api/admin/releases/sync
 * Trigger manual sync of release data from Microsoft API
 */
router.post('/releases/sync', async (req, res, next) => {
  try {
    // TODO: Implement release sync service
    // TODO: Add auth middleware
    res.json({ message: 'Sync endpoint - TODO: implement sync service' });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/admin/content
 * Get all content pages (including drafts) for admin
 */
router.get('/content', async (req, res, next) => {
  try {
    // TODO: Add auth middleware
    const pages = await prisma.contentPage.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });
    res.json({ data: pages });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/admin/content
 * Create a new content page
 */
router.post('/content', async (req, res, next) => {
  try {
    // TODO: Add auth middleware
    // TODO: Add validation middleware
    const page = await prisma.contentPage.create({
      data: req.body
    });
    res.status(201).json({ data: page });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/admin/content/:id
 * Update a content page
 */
router.put('/content/:id', async (req, res, next) => {
  try {
    // TODO: Add auth middleware
    // TODO: Add validation middleware
    const { id } = req.params;
    const page = await prisma.contentPage.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json({ data: page });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/admin/content/:id
 * Delete a content page
 */
router.delete('/content/:id', async (req, res, next) => {
  try {
    // TODO: Add auth middleware
    const { id } = req.params;
    await prisma.contentPage.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/admin/sync-logs
 * Get sync history
 */
router.get('/sync-logs', async (req, res, next) => {
  try {
    // TODO: Add auth middleware
    const logs = await prisma.syncLog.findMany({
      orderBy: { completedAt: 'desc' },
      take: 50
    });
    res.json({ data: logs });
  } catch (error) {
    next(error);
  }
});

export default router;
