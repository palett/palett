import { Amber, Cyan, Grey, Teal }             from '@palett/cards'
import { deco }                                from '@spare/deco'
import { says, xr }                            from '@spare/logger'
import { Morisot }                             from '../lib/morisot'
import { BOLD, INVERSE, INVISIBLE, UNDERLINE } from '../lib/styles'
import { ofStyle }                             from '../lib/toStyle'


const candidates = {
  alpha: { fore: Teal.accent_1, back: Amber.lighten_1, style: ofStyle(BOLD, INVERSE) },
  beta: { fore: Cyan.base, back: Grey.darken_2, style: ofStyle(BOLD, UNDERLINE, INVISIBLE) },
}

for (let key in candidates) {
  const o = candidates[key]
  xr().br(Morisot.presetToCode(o)).p(deco(o)) |> says[key]
}

