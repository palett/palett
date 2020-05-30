import { Effects, SC } from '@palett/util-ansi'

export const parseEffects = effects => {
  let h = '', t = ''
  if (effects.length) {
    let l, r
    for (let e of effects)
      if (e in Effects && ([l, r] = Effects[e]))
        h += SC + l , t += SC + r
  }
  return { h, t }
}
