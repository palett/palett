import { camelToLowerDashed } from '@spare/string'

/**
 *
 * @param {string} name
 * @returns {string}
 */
export const readify = name => (camelToLowerDashed(name, '.'))
  .replace('light', 'l')
  .replace('deep', 'd')
