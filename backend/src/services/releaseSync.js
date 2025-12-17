import fetch from 'node-fetch';
import prisma from '../config/database.js';
import config from '../config/index.js';

/**
 * Service for syncing release data from Microsoft Release Plans API
 */

/**
 * Sync release data from Microsoft API
 * @returns {Promise<Object>} Sync result with count and status
 */
export async function syncReleaseData() {
  const startedAt = new Date();
  let itemsSynced = 0;
  let status = 'SUCCESS';
  let errorMessage = null;

  try {
    // TODO: Implement actual API fetching logic
    // 1. Fetch data from Microsoft Release Plans API
    // 2. Parse and transform the data
    // 3. Upsert into database
    // 4. Track sync statistics

    console.log('Starting release data sync...');
    
    // Placeholder for actual implementation
    const response = await fetch(config.api.microsoftReleaseApi);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // TODO: Parse response and sync to database
    // const data = await response.json();
    // itemsSynced = data.length;

    console.log(`Sync completed. Items synced: ${itemsSynced}`);
  } catch (error) {
    console.error('Sync failed:', error);
    status = 'FAILED';
    errorMessage = error.message;
  } finally {
    // Log sync attempt
    await prisma.syncLog.create({
      data: {
        syncType: 'RELEASE_ITEMS',
        itemsSynced,
        status,
        errorMessage,
        startedAt,
        completedAt: new Date()
      }
    });
  }

  return {
    success: status === 'SUCCESS',
    itemsSynced,
    errorMessage
  };
}

/**
 * Get the last successful sync timestamp
 * @returns {Promise<Date|null>} Last sync date or null
 */
export async function getLastSyncTime() {
  const lastSync = await prisma.syncLog.findFirst({
    where: {
      syncType: 'RELEASE_ITEMS',
      status: 'SUCCESS'
    },
    orderBy: { completedAt: 'desc' }
  });

  return lastSync ? lastSync.completedAt : null;
}
