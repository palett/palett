import { FRESH, PLANET, SUBTLE }                                from '@palett/presets'
import { stringValue }                                          from '@spare/string-value'
import { isNumeric as isNumericFull, parseNum as parseNumFull } from '@texting/charset-fullwidth'
import { isNumeric as isNumericHalf, parseNum as parseNumHalf } from '@texting/charset-halfwidth'
import { isLiteral as isLiteralHalf, isLiteralAny }             from '@typen/literal'
import { replenish }                                            from '@vect/object-update'
import { mutate, mutazip }                                      from '@vect/vector'

export const isNumericAny = x => isNumericFull(x) || isNumericHalf(x)

export const NUM_BOUND_CONF_FULL = { by: isNumericAny, to: parseNumFull }
export const STR_BOUND_CONF_FULL = { by: isLiteralAny, to: stringValue }
export const NUM_BOUND_CONF_HALF = { by: isNumericHalf, to: parseNumHalf }
export const STR_BOUND_CONF_HALF = { by: isLiteralHalf, to: stringValue }

export const NUMERIC_PRESET = FRESH
export const LITERAL_PRESET = PLANET
export const HEADING_PRESET = SUBTLE

export class PresetCollection extends Array {
  constructor(presets) {
    super(presets.length)
    for(let i=0;i<presets.length;i++){
      this[i]=presets[i]
    }
    mutazip(this, presets, (receiver, preset) => Object.assign({}, preset))
  }
  static build(...presets) { return new PresetCollection(presets) }
  assignPresets(...presets) {
    // if (this.length < presets.length) {this.length = presets.length}
    return mutazip(this, presets, (conf, preset) => Object.assign(conf ?? {}, preset), presets.length)
  }
  replenishPresets(...presets) {
    // if (this.length < presets.length) {this.length = presets.length}
    return mutazip(this, presets, (conf, preset) => replenish(conf ?? {}, preset), presets.length)
  }
  assignEffect(...effects) {
    if (effects.length === 0) return this
    return mutate(this, conf => (conf.effects = effects, conf))
  }
  setBound(full) {
    const boundConfigs = full
      ? [NUM_BOUND_CONF_FULL, STR_BOUND_CONF_FULL, STR_BOUND_CONF_FULL]
      : [NUM_BOUND_CONF_HALF, STR_BOUND_CONF_HALF, STR_BOUND_CONF_HALF]
    return mutazip(this, boundConfigs, (conf, boundConf) => Object.assign(conf, boundConf))
  }
}

// if (presets.length === 0) presets = [NUMERIC_PRESET, LITERAL_PRESET]