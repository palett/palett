import { FORE, CLR_FORE, Effects, br } from '@palett/util-ansi'

/**
 *
 * @param {string} tx
 * @returns {string}
 */
export function impart (tx) {
  return br(this[0]) + tx + br(this[1])
}

/***
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {...string} [effects]
 * @returns {function<string,string>}
 */
export const Dye = ([r, g, b], ...effects) => {
  const h = [FORE, r, g, b], t = [CLR_FORE]
  if (effects.length) {
    let l, r
    for (let e of effects)
      if (e in Effects && ([l, r] = Effects[e]))
        (h.push(l), t.push(r))
  }
  return impart.bind([h, t])
}
