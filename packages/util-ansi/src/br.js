import { L, R, SC } from '../resources/controlCodes'

/**
 *
 * @param {string[]} codes
 * @returns {string}
 */
export const br = codes => L + codes.join(SC) + R

/**
 *
 * @param {string} code
 * @returns {string}
 */
export const brt = code => L + code + R
