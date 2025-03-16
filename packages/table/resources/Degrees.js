import { init } from '@vect/vector-init'

const
  accents = init(4, i => `accent_${i + 1}`).reverse(),
  lightens = init(5, i => `lighten_${i + 1}`).reverse(),
  darkens = init(4, i => `darken_${i + 1}`)

export const Degrees = {
  entire: [ ...accents, ...lightens, 'base', ...darkens ],
  base: [ 'base' ],
  lightens: lightens,
  darkens: darkens,
  accents: accents,
  readable: [ ...accents.slice(-3), ...lightens.slice(-3), 'base' ],
}

