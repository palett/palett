import { round }              from '@aryth/math'
import { hexToRgb, rgbToHex } from '@palett/convert'
import { HEX, HSL, RGB }      from '@palett/enum-color-space'
import { Indicator }          from '@vect/vector-indicator'
import { mutate }             from '@vect/vector-mapper'

export function VectorAverage(space) {
  if (space === RGB || space === HSL)
    return Indicator({
      init: () => [ 0, 0, 0 ],
      pile(rgb) { this[0] += rgb[0], this[1] += rgb[1], this[2] += rgb[2] },
      pick: (rgb, l) => mutate(rgb, x => round(x / l), 3),
    })
  if (space === HEX) return vec => rgbToHex(VectorAverage(RGB)(vec.map(hexToRgb)))
}
