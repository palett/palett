import { DyeFactory } from './src/DyeFactory'

export { DyeFactory } from './src/DyeFactory'

/**
 *
 * @param space
 * @param effects
 * @returns {Function} return a dye, a function which takes color as argument and returns dye function
 */
export const PrepDye = (space, ...effects) => DyeFactory.build(space, effects)