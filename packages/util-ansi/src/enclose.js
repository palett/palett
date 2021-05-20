import { CSI, SC, SGR } from '../resources/controlCodes'

/**
 *
 * @param {string[]} codes
 * @returns {string}
 */
export const chainEnclose = codes => CSI + codes.join(SC) + SGR

/**
 *
 * @param {string} code
 * @returns {string}
 */
export const enclose = code => CSI + code + SGR
