import prisma from '../config/database.js';

/**
 * Service for managing content pages (CRUD operations)
 */

/**
 * Get all content pages with optional filtering
 * @param {Object} filters - Filter options (type, status, authorId)
 * @returns {Promise<Array>} Array of content pages
 */
export async function getContentPages(filters = {}) {
  const where = {};
  
  if (filters.type) {
    where.type = filters.type;
  }
  
  if (filters.status) {
    where.status = filters.status;
  }
  
  if (filters.authorId) {
    where.authorId = filters.authorId;
  }

  return await prisma.contentPage.findMany({
    where,
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
}

/**
 * Get a single content page by slug
 * @param {string} slug - Page slug
 * @returns {Promise<Object|null>} Content page or null
 */
export async function getContentBySlug(slug) {
  return await prisma.contentPage.findUnique({
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
}

/**
 * Create a new content page
 * @param {Object} data - Page data
 * @returns {Promise<Object>} Created page
 */
export async function createContentPage(data) {
  // Validation is handled by route middleware
  return await prisma.contentPage.create({
    data,
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
}

/**
 * Update a content page
 * @param {number} id - Page ID
 * @param {Object} data - Updated page data
 * @returns {Promise<Object>} Updated page
 */
export async function updateContentPage(id, data) {
  // Validation is handled by route middleware
  return await prisma.contentPage.update({
    where: { id },
    data,
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
}

/**
 * Delete a content page
 * @param {number} id - Page ID
 * @returns {Promise<Object>} Deleted page
 */
export async function deleteContentPage(id) {
  return await prisma.contentPage.delete({
    where: { id }
  });
}

/**
 * Publish a content page
 * @param {number} id - Page ID
 * @returns {Promise<Object>} Published page
 */
export async function publishContentPage(id) {
  return await prisma.contentPage.update({
    where: { id },
    data: {
      status: 'PUBLISHED',
      publishedAt: new Date()
    }
  });
}
