import express from 'express';
import prisma from '../config/database.js';

const router = express.Router();

/**
 * GET /api/content/pages
 * Get all published pages
 */
router.get('/pages', async (req, res, next) => {
  try {
    const pages = await prisma.contentPage.findMany({
      where: {
        type: 'PAGE',
        status: 'PUBLISHED'
      },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        publishedAt: true
      },
      orderBy: { publishedAt: 'desc' }
    });
    res.json({ data: pages });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/content/posts
 * Get all published posts
 */
router.get('/posts', async (req, res, next) => {
  try {
    const posts = await prisma.contentPage.findMany({
      where: {
        type: 'POST',
        status: 'PUBLISHED'
      },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        featuredImage: true,
        publishedAt: true
      },
      orderBy: { publishedAt: 'desc' }
    });
    res.json({ data: posts });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/content/:slug
 * Get a single content page by slug
 */
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const page = await prisma.contentPage.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    if (!page || page.status !== 'PUBLISHED') {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    res.json({ data: page });
  } catch (error) {
    next(error);
  }
});

export default router;
