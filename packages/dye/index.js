import { DyeFactory } from './src/dyeFactory'

export { dye }                                        from './src/_dye'
export { Dye }                                        from './src/dye'
export { DyeFactory }                                 from './src/dyeFactory'
export { assignStyle, assignStyle as assignEffects }  from './util/assignStyle'
export { assignHex, assignHsl, assignInt, assignRgb } from './util/assignColor'
export { Panel }                                      from './util/panel'
/**
 *
 * @param space
 * @param effects
 * @returns {Function} return a dye, a function which takes color as argument and returns dye function
 */
export const PrepDye = (space, ...effects) => DyeFactory.build(space, effects)