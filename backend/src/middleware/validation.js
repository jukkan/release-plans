import Joi from 'joi';

/**
 * Validation middleware factory
 * Validates request body, query, or params against a Joi schema
 */

/**
 * Create validation middleware for request body
 * @param {Joi.Schema} schema - Joi validation schema
 * @returns {Function} Express middleware function
 */
export function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      return res.status(400).json({ error: 'Validation error', errors });
    }

    req.body = value;
    next();
  };
}

/**
 * Create validation middleware for query parameters
 * @param {Joi.Schema} schema - Joi validation schema
 * @returns {Function} Express middleware function
 */
export function validateQuery(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      return res.status(400).json({ error: 'Validation error', errors });
    }

    req.query = value;
    next();
  };
}

/**
 * Create validation middleware for route parameters
 * @param {Joi.Schema} schema - Joi validation schema
 * @returns {Function} Express middleware function
 */
export function validateParams(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      return res.status(400).json({ error: 'Validation error', errors });
    }

    req.params = value;
    next();
  };
}

// Release query validation schema
const releaseQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(50),
  products: Joi.string().allow(''),
  investmentAreas: Joi.string().allow(''),
  search: Joi.string().allow('').max(200),
  gaDateFrom: Joi.date().iso(),
  gaDateTo: Joi.date().iso(),
  releaseWave: Joi.string().allow(''),
  sortBy: Joi.string().valid('gaDate', 'productName', 'featureName', 'lastUpdated').default('gaDate'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
});

/**
 * Validate release query parameters
 */
export function validateReleaseQuery(req, res, next) {
  const { error, value } = releaseQuerySchema.validate(req.query, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map(d => ({ field: d.path.join('.'), message: d.message })),
    });
  }

  req.query = value;
  next();
}

// Common validation schemas
export const schemas = {
  // Login schema
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),

  // Content page schema
  contentPage: Joi.object({
    slug: Joi.string().pattern(/^[a-z0-9-]+$/).required(),
    title: Joi.string().max(255).required(),
    content: Joi.string().allow('', null),
    markdownContent: Joi.string().allow('', null),
    excerpt: Joi.string().allow('', null),
    featuredImage: Joi.string().uri().allow('', null),
    type: Joi.string().valid('PAGE', 'POST').default('PAGE'),
    status: Joi.string().valid('DRAFT', 'PUBLISHED').default('DRAFT'),
    metaTitle: Joi.string().max(255).allow('', null),
    metaDescription: Joi.string().allow('', null)
  }),

  // Release query filters
  releaseFilters: Joi.object({
    productName: Joi.string(),
    investmentArea: Joi.string(),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso(),
    limit: Joi.number().integer().min(1).max(100).default(50),
    offset: Joi.number().integer().min(0).default(0)
  })
};
