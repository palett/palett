import { hslToHex } from '@palett/convert'
import { Dye }      from '@palett/dye'
import { xr }       from '@spare/logger'


export const BlueGreyAccents = {
  accent_1: [ 200, 22, 77 ],
  accent_2: [ 200, 22, 62 ],
  accent_3: [ 200, 22, 52 ],
  accent_4: [ 200, 22, 42 ],
}

export const BrownAccents = {
  accent_1: [ 16, 24, 77 ],
  accent_2: [ 16, 24, 62 ],
  accent_3: [ 16, 24, 52 ],
  accent_4: [ 16, 24, 42 ],
}

export const GreyAccents = {
  accent_1: [ 0, 0, 77 ],
  accent_2: [ 0, 0, 62 ],
  accent_3: [ 0, 0, 52 ],
  accent_4: [ 0, 0, 42 ],
}

const check = (ob) => {
  for (let [ name, hsl ] of Object.entries(ob)) {
    xr(name, String(hsl) |> Dye.hsl(hsl)).tag('HEX', hsl |> hslToHex) |> console.log
  }
  '' |> console.log
}

check(BlueGreyAccents)
check(BrownAccents)
check(GreyAccents)
// 4,3,2,1: 42,52,62,77
// Brown:  16, 18
// BlueGrey: 200, 15
// Grey: 0, 0
