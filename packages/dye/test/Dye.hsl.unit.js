import { oneself }                      from '@ject/oneself'
import { hslToHex, hslToInt, hslToRgb } from '@palett/convert'
import { Dye }                          from '../src/index.js'

const hsl = [ 345, 60, 55 ]
{
  const color = hslToHex(hsl)
  const fn = Dye.hex(color)
  console.log(fn(`[hex] ${color}`))
}
{
  const color = oneself(hsl)
  const fn = Dye.hsl(color)
  console.log(fn(`[hsl] ${color}`))
}
{
  const color = hslToInt(hsl)
  const fn = Dye.int(color)
  console.log(fn(`[int] ${color}`))
}
{
  const color = hslToRgb(hsl)
  const fn = Dye.rgb(color)
  console.log(fn(`[rgb] ${color}`))
}



