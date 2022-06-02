import { Dye }                          from '../index'
import { hslToHex, hslToInt, hslToRgb } from '@palett/convert'
import { oneself }                      from '@ject/oneself'

const hsl = [345, 60, 55]
{
  const color = hslToHex(hsl)
  const fn = Dye.hex(color)
  fn(`[hex] ${color}`) |> console.log
}
{
  const color = oneself(hsl)
  const fn = Dye.hsl(color)
  fn(`[hsl] ${color}`) |> console.log
}
{
  const color = hslToInt(hsl)
  const fn = Dye.int(color)
  fn(`[int] ${color}`) |> console.log
}
{
  const color = hslToRgb(hsl)
  const fn = Dye.rgb(color)
  fn(`[rgb] ${color}`) |> console.log
}



