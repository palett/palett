import { COLUMNWISE, POINTWISE, ROWWISE } from '@vect/enum-matrix-directions'
import { fluoByColumns }                  from './fluoByColumns'
import { fluoByRows }                     from './fluoByRows'
import { fluoPointwise }                  from './fluoPointwise'


/**
 *
 * @typedef {Object} Preset
 * @typedef {string} Preset.max
 * @typedef {string} Preset.min
 * @typedef {string} Preset.na
 * @typedef {Function} Preset.filter
 * @typedef {Function} Preset.mapper
 *
 * @param {*[][]} mx
 * @param {Object} config
 * @param {number} [config.direct=POINTWISE]
 * @param {Preset|Preset[]} [config.presets]
 * @param {string[]} [config.effects]
 */
export const fluoMatrix = function (mx, config) {
  switch (config.direct) {
    case ROWWISE:
      return fluoByRows.call(this, mx, config)
    case COLUMNWISE:
      return fluoByColumns.call(this, mx, config)
    case POINTWISE:
    default:
      return fluoPointwise.call(this, mx, config)
  }
}



