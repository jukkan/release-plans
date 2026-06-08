/**
 * Global error handling middleware
 * Catches and formats errors for consistent API responses
 */

/**
 * Error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export default function errorHandler(err, req, res, next) {
  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method
  });

  // Prisma errors
  if (err.code) {
    // Prisma unique constraint violation
    if (err.code === 'P2002') {
      return res.status(409).json({
        error: 'Duplicate entry',
        message: 'A record with this value already exists'
      });
    }

    // Prisma record not found
    if (err.code === 'P2025') {
      return res.status(404).json({
        error: 'Not found',
        message: 'The requested resource was not found'
      });
    }

    // Other Prisma errors
    return res.status(400).json({
      error: 'Database error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'A database error occurred'
    });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation error',
      details: err.details,
    });
  }

  // JWT errors are handled in auth middleware

  // Default error response
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    error: statusCode === 500 ? 'Internal server error' : message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

/**
 * Not found middleware
 * Handles requests to undefined routes
 */
export function notFoundHandler(req, res) {
  res.status(404).json({
    error: 'Not found',
    message: `Cannot ${req.method} ${req.path}`
  });
}

/**
 * Async handler wrapper
 * Wraps async route handlers to catch errors
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware function
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
