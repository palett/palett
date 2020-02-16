import { ESC } from '../resources/controlCodes'

/**
 *
 * @param {string[]} config
 * @returns {string}
 */
export const br = config => `${ESC}[${config.join(';')}m`

/**
 *
 * @param {string} config
 * @returns {string}
 */
export const brt = config => `${ESC}[${config}m`
