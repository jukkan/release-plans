import prisma from '../config/database.js';

/**
 * Get all releases with filtering, pagination, sorting, and search
 * @param {Object} options - Query options
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Items per page (default: 50, max: 100)
 * @param {string[]} options.products - Filter by product names
 * @param {string[]} options.investmentAreas - Filter by investment areas
 * @param {string} options.search - Search term for feature name, business value
 * @param {string} options.gaDateFrom - Filter GA date from (YYYY-MM-DD)
 * @param {string} options.gaDateTo - Filter GA date to (YYYY-MM-DD)
 * @param {string} options.releaseWave - Filter by release wave
 * @param {string} options.sortBy - Sort field (gaDate, productName, featureName, lastUpdated)
 * @param {string} options.sortOrder - Sort order (asc, desc)
 * @returns {Promise<{items: Array, pagination: Object}>}
 */
export async function getReleases(options = {}) {
  const {
    page = 1,
    limit = 50,
    products = [],
    investmentAreas = [],
    search = '',
    gaDateFrom,
    gaDateTo,
    releaseWave,
    sortBy = 'gaDate',
    sortOrder = 'desc',
  } = options;

  // Build where clause for filtering
  const where = {};

  // Filter by products
  if (products && products.length > 0) {
    where.productName = { in: products };
  }

  // Filter by investment areas
  if (investmentAreas && investmentAreas.length > 0) {
    where.investmentArea = { in: investmentAreas };
  }

  // Filter by GA date range
  if (gaDateFrom || gaDateTo) {
    where.gaDate = {};
    if (gaDateFrom) {
      where.gaDate.gte = new Date(gaDateFrom);
    }
    if (gaDateTo) {
      where.gaDate.lte = new Date(gaDateTo);
    }
  }

  // Filter by release wave
  if (releaseWave) {
    where.gaReleaseWave = releaseWave;
  }

  // Search across multiple fields
  if (search) {
    where.OR = [
      { featureName: { contains: search, mode: 'insensitive' } },
      { businessValue: { contains: search, mode: 'insensitive' } },
      { featureDetails: { contains: search, mode: 'insensitive' } },
    ];
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Map sort field names
  const sortFieldMap = {
    gaDate: 'gaDate',
    productName: 'productName',
    featureName: 'featureName',
    lastUpdated: 'lastUpdated',
  };
  const sortField = sortFieldMap[sortBy] || 'gaDate';

  // Execute queries
  const [items, total] = await Promise.all([
    prisma.releaseItem.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortField]: sortOrder },
    }),
    prisma.releaseItem.count({ where }),
  ]);

  // Calculate pagination metadata
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    items: items || [],
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext,
      hasPrev,
    },
  };
}

/**
 * Get a single release item by ID
 * @param {string} id - Release item ID
 * @returns {Promise<Object|null>}
 */
export async function getReleaseById(id) {
  const release = await prisma.releaseItem.findUnique({
    where: { id },
  });
  return release;
}

/**
 * Get summary statistics
 * @returns {Promise<Object>} Stats object with totals, products list, investment areas list
 */
export async function getReleaseStats() {
  // Get total count
  const totalItems = await prisma.releaseItem.count();

  // Get products with counts
  const productsData = await prisma.releaseItem.groupBy({
    by: ['productName'],
    _count: { productName: true },
    orderBy: { _count: { productName: 'desc' } },
  });

  const products = productsData.map((p) => ({
    name: p.productName,
    count: p._count.productName,
  }));

  // Get investment areas with counts
  const investmentAreasData = await prisma.releaseItem.groupBy({
    by: ['investmentArea'],
    _count: { investmentArea: true },
    where: { investmentArea: { not: null } },
    orderBy: { _count: { investmentArea: 'desc' } },
  });

  const investmentAreas = investmentAreasData.map((ia) => ({
    name: ia.investmentArea,
    count: ia._count.investmentArea,
  }));

  // Get release waves with counts
  const releaseWavesData = await prisma.releaseItem.groupBy({
    by: ['gaReleaseWave'],
    _count: { gaReleaseWave: true },
    where: { gaReleaseWave: { not: null } },
    orderBy: { _count: { gaReleaseWave: 'desc' } },
  });

  const releaseWaves = releaseWavesData.map((rw) => ({
    name: rw.gaReleaseWave,
    count: rw._count.gaReleaseWave,
  }));

  // Get latest sync date
  const lastSync = await prisma.syncLog.findFirst({
    where: {
      syncType: 'RELEASE_ITEMS',
      status: 'SUCCESS',
    },
    orderBy: { completedAt: 'desc' },
  });

  return {
    totalItems,
    products,
    investmentAreas,
    releaseWaves,
    lastSync: lastSync ? lastSync.completedAt : null,
  };
}

/**
 * Get unique filter values for dropdowns
 * @returns {Promise<Object>} Filter options (products, investmentAreas, releaseWaves)
 */
export async function getFilterOptions() {
  // Get distinct products with counts
  const productsData = await prisma.releaseItem.groupBy({
    by: ['productName'],
    _count: { productName: true },
    orderBy: { productName: 'asc' },
  });

  const products = productsData.map((p) => ({
    value: p.productName,
    label: p.productName,
    count: p._count.productName,
  }));

  // Get distinct investment areas with counts
  const investmentAreasData = await prisma.releaseItem.groupBy({
    by: ['investmentArea'],
    _count: { investmentArea: true },
    where: { investmentArea: { not: null } },
    orderBy: { investmentArea: 'asc' },
  });

  const investmentAreas = investmentAreasData.map((ia) => ({
    value: ia.investmentArea,
    label: ia.investmentArea,
    count: ia._count.investmentArea,
  }));

  // Get distinct release waves
  const releaseWavesData = await prisma.releaseItem.groupBy({
    by: ['gaReleaseWave'],
    _count: { gaReleaseWave: true },
    where: { gaReleaseWave: { not: null } },
    orderBy: { gaReleaseWave: 'asc' },
  });

  const releaseWaves = releaseWavesData.map((rw) => ({
    value: rw.gaReleaseWave,
    label: rw.gaReleaseWave,
    count: rw._count.gaReleaseWave,
  }));

  return {
    products,
    investmentAreas,
    releaseWaves,
  };
}
