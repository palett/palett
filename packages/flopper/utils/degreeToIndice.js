import { rand, randIntBetw } from '@aryth/rand'

const LIGHTEN = 'lighten', ACCENT = 'accent', DARKEN = 'darken'

export const degreeToIndice = degree => {
  let i = degree.indexOf('_')
  if (i < 0) return randIntBetw(14, 16)
  let cate = degree.slice(0, i), order = degree.slice(++i)
  if (cate === LIGHTEN) return 15 - --order * 3
  if (cate === ACCENT) return 14 - --order * 3
  if (cate === DARKEN) return 13 - --order * 3
  return rand(16)
}

