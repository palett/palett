import { samplesToCrostab }   from '@analys/convert'
import { oneself }            from '@ject/oneself'
import { Cards }              from '@palett/cards'
import { hexToHsl, hexToRgb } from '@palett/convert'
import { DyeFactory }         from '@palett/dye'
import { HEX, HSL, RGB }      from '@palett/enum-color-space'
import { INVERSE }            from '@palett/enum-font-effects'
// import { camelToSnake }       from '@spare/phrasing'
// import { makeReplaceable }    from '@spare/translator'
import { mapper }             from '@vect/vector-mapper'
import { ColorGroups }        from '../resources/ColorGroups'
import { Degrees }            from '../resources/Degrees'

// const lexicon = [
//   [/light/gi, 'l'],
//   [/deep/gi, 'd']
// ] |> makeReplaceable

// export const shortenDescription = name => name.replace(lexicon, x => camelToSnake(x, '.'))

export function palettCrostab({
                                space = HEX,
                                degrees = Degrees.entire,
                                colors = ColorGroups.entire,
                                dyed = false,
                              } = {}) {
  const crostab = samplesToCrostab(Cards, { side: colors, head: degrees }).transpose()
  if (space !== HEX) {
    crostab.mutate(space === RGB ? hexToRgb : space === HSL ? hexToHsl : oneself)
  }
  if (dyed) {
    const dyeFactory = DyeFactory.build(space, [INVERSE])
    space === HEX
      ? crostab.mutate(hex => hex |> dyeFactory(hex))
      : crostab.mutate(xyz => mapper(xyz, v => v.toFixed(0).padStart(3))  |> dyeFactory(xyz))
  }
  return crostab
    // .mutateBanner(shortenDescription)
}