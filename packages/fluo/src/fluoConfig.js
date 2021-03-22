import { FRESH, PLANET, SUBTLE }                                from '@palett/presets'
import { stringValue }                                          from '@spare/string-value'
import { isNumeric as isNumericFull, parseNum as parseNumFull } from '@texting/charset-fullwidth'
import { isNumeric as isNumericHalf, parseNum as parseNumHalf } from '@texting/charset-halfwidth'
import { isLiteral as isLiteralHalf, isLiteralAny }             from '@typen/literal'
import { acquire, mutazip, mutate }                             from '@vect/vector'

export const isNumericAny = x => isNumericFull(x) || isNumericHalf(x)

export const NUM_BOUND_CONF_FULL = { filter: isNumericAny, mapper: parseNumFull }
export const STR_BOUND_CONF_FULL = { filter: isLiteralAny, mapper: stringValue }
export const NUM_BOUND_CONF_HALF = { filter: isNumericHalf, mapper: parseNumHalf }
export const STR_BOUND_CONF_HALF = { filter: isLiteralHalf, mapper: stringValue }

export const NUMERIC_PRESET = FRESH
export const LITERAL_PRESET = PLANET
export const HEADING_PRESET = SUBTLE

export class FluoConfigs extends Array {
  constructor(presets) {
    super()
    if (presets.length) acquire(this, presets.map(preset => ({ preset })))
  }
  static build(...presets) { return new FluoConfigs(presets) }
  assignPresets(...presets) {
    if (presets.length === 0) presets = [NUMERIC_PRESET, LITERAL_PRESET]
    return mutazip(
      this,
      presets,
      (conf, preset) => conf ? (conf.preset = preset, conf) : { preset },
      presets.length
    )
  }
  assignEffect(...effects) {
    if (effects.length === 0) return this
    return mutate(this, conf => (conf.effects = effects, conf))
  }
  assignBoundConfigs(full) {
    const boundConfigs = full
      ? [NUM_BOUND_CONF_FULL, STR_BOUND_CONF_FULL, STR_BOUND_CONF_FULL]
      : [NUM_BOUND_CONF_HALF, STR_BOUND_CONF_HALF, STR_BOUND_CONF_HALF]
    return mutazip(this, boundConfigs, (conf, boundConf) => Object.assign(conf, boundConf))
  }
}