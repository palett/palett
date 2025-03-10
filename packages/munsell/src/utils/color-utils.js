import { abs }      from '@aryth/math'
import { distance } from '@aryth/polar'

/**
 * @param {number} hsib - 25 bit integer
 * @param {number} hsip - 25 bit integer
 * @returns {number}
 */
export const deltaHsi = (hsib, hsip) => {
  const hb = hsib >> 16 & 0x1FF, sb = hsib >> 8 & 0xFF, lb = hsib & 0xFF
  const hp = hsip >> 16 & 0x1FF, sp = hsip >> 8 & 0xFF, lp = hsip & 0xFF
  const dh = distance(hb, hp)
  const ds = abs(sp - sb)
  const dl = abs(lp - lb)
  // if (hsip === 10768531) console.log(dh, ds, dl, dh + ds + dl,hexToStr(hsiToHex(hsip)))
  return dh + ds + dl
}