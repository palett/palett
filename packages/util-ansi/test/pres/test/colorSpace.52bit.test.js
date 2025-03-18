import { DeepPurple, Green, Grey, Orange, Purple, Teal } from '@palett/cards'
import { xr }                                            from '@spare/logger'
import { BLINK, BOLD, INVERSE, INVISIBLE, UNDERLINE }    from '../lib/styles.js'

const candidates = {
  alpha: { mode: [ BOLD, UNDERLINE ], fore: Green.accent_2, back: Orange.darken_3 },
  beta: { mode: [ INVERSE ], fore: Purple.lighten_5, back: DeepPurple.darken_3 },
  gamma: { mode: [ BLINK, INVISIBLE ], fore: Teal.accent_2, back: Grey.darken_3 },
}

for (const [ key, { mode, fore, back } ] of Object.entries(candidates)) {
  xr().key(key)
}
