import { Ar } from 'veho'

const
  accents = Ar.ini(4, i => `accent_${i + 1}`).reverse(),
  lightens = Ar.ini(5, i => `lighten_${i + 1}`).reverse(),
  darkens = Ar.ini(4, i => `darken_${i + 1}`)

export const Degrees = {
  entire: [...accents, ...lightens, 'base', ...darkens],
  base: ['base'],
  lightens: lightens,
  darkens: darkens,
  accents: accents,
  readable: [...accents.slice(-3), ...lightens.slice(-3), 'base']
}

