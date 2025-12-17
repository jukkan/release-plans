import express from 'express';
import prisma from '../config/database.js';
import { validateBody } from '../middleware/validation.js';
import { schemas } from '../middleware/validation.js';
import authMiddleware, { requireRole } from '../middleware/auth.js';

const router = express.Router();

/**
 * Admin routes - all routes require authentication
 * All endpoints in this router require authentication and appropriate roles
 */

/**
 * POST /api/admin/releases/sync
 * Trigger manual sync of release data from Microsoft API
 * Requires ADMIN role
 */
router.post('/releases/sync', authMiddleware, requireRole('ADMIN'), async (req, res, next) => {
  try {
    // TODO: Implement release sync service
    res.json({ message: 'Sync endpoint - TODO: implement sync service' });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/admin/content
 * Get all content pages (including drafts) for admin
 * Requires ADMIN or EDITOR role
 */
router.get('/content', authMiddleware, requireRole('ADMIN', 'EDITOR'), async (req, res, next) => {
  try {
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
 * Requires ADMIN or EDITOR role
 */
router.post('/content', authMiddleware, requireRole('ADMIN', 'EDITOR'), validateBody(schemas.contentPage), async (req, res, next) => {
  try {
    const page = await prisma.contentPage.create({
      data: {
        ...req.body,
        authorId: req.user.userId // Set author from authenticated user
      }
    });
    res.status(201).json({ data: page });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/admin/content/:id
 * Update a content page
 * Requires ADMIN or EDITOR role
 */
router.put('/content/:id', authMiddleware, requireRole('ADMIN', 'EDITOR'), validateBody(schemas.contentPage), async (req, res, next) => {
  try {
    const { id } = req.params;
    const pageId = parseInt(id, 10);
    
    if (isNaN(pageId)) {
      return res.status(400).json({ error: 'Invalid page ID' });
    }
    
    const page = await prisma.contentPage.update({
      where: { id: pageId },
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
 * Requires ADMIN role
 */
router.delete('/content/:id', authMiddleware, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const pageId = parseInt(id, 10);
    
    if (isNaN(pageId)) {
      return res.status(400).json({ error: 'Invalid page ID' });
    }
    
    await prisma.contentPage.delete({
      where: { id: pageId }
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/admin/sync-logs
 * Get sync history
 * Requires ADMIN role
 */
router.get('/sync-logs', authMiddleware, requireRole('ADMIN'), async (req, res, next) => {
  try {
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
