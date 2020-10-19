export { NL }                    from './resources/BOUND_CONF'
export { Projector }             from './src/dyer/utils/projector'
export { hslToDye }              from './src/dyer/utils/hslToDye'
export { leverage }              from './src/dyer/utils/leverage'
export { presetToLeap }          from './src/presetReader/presetToLeap'
export { presetToFlat }          from './src/presetReader/presetToFlat'
export { dyemap }                from './src/dyemap/dyemap'
export { dyezip }                from './src/dyezip/dyezip'
export { fluo, fluo as fluoZip } from './src/fluo/fluo'
export { parseHsl }              from './src/presetReader/parseHsl'

export const extractBound = (objectWithBound) => {
  return objectWithBound ? {
    max: objectWithBound.max,
    min: objectWithBound.min
  } : null
}
