import { useState, useCallback } from 'react';

/**
 * Custom hook for managing filter state
 * @param {Object} initialFilters - Initial filter values
 * @returns {Object} Filter state and handlers
 */
export function useFilters(initialFilters = {}) {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const removeFilter = useCallback((key) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  return {
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    removeFilter,
  };
}

/**
 * Custom hook for search functionality
 * @param {Array} items - Items to search through
 * @param {Array} keys - Keys to search in
 * @returns {Object} Search state and handler
 */
export function useSearch(items = [], keys = []) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = searchTerm
    ? items.filter(item => {
        const searchLower = searchTerm.toLowerCase();
        return keys.some(key => {
          const value = item[key];
          return value && value.toString().toLowerCase().includes(searchLower);
        });
      })
    : items;

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
}
