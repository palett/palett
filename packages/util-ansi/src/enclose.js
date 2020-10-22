import { L, R, SC } from '../resources/controlCodes'

/**
 *
 * @param {string[]} codes
 * @returns {string}
 */
export const chainEnclose = codes => L + codes.join(SC) + R

/**
 *
 * @param {string} code
 * @returns {string}
 */
export const enclose = code => L + code + R
