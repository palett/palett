import { fluoVector }    from '@palett/fluo-vector'
import { columnsMapper } from '@vect/columns-mapper'
import { transpose }     from '@vect/matrix-algebra'


/**
 *
 * @typedef {Object|Preset} Preset
 * @typedef {string} Preset.min
 * @typedef {string} Preset.max
 * @typedef {string} Preset.na
 * @typedef {string[]} Preset.effects
 * @typedef {Function} Preset.by
 * @typedef {Function} Preset.to
 *
 * @param {*[][]} mx
 * @param {Preset[]} [config]
 * @returns {*[][]}
 */
export function fluoByColumns(mx, config) {
  return transpose(columnsMapper(mx, col => fluoVector.call(this, col, config)))
}
