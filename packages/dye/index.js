import { DyeFactory } from './src/DyeFactory'

export { dye }                                        from './src/_dye'
export { Dye }                                        from './src/Dye'
export { DyeFactory }                                 from './src/DyeFactory'
export { assignEffects }                              from './src/assignEffects'
export { assignHex, assignHsl, assignInt, assignRgb } from './src/assignColor'
/**
 *
 * @param space
 * @param effects
 * @returns {Function} return a dye, a function which takes color as argument and returns dye function
 */
export const PrepDye = (space, ...effects) => DyeFactory.build(space, effects)