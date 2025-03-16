import { hexOntoHsl, hexOntoRgb, hslToInt } from '@palett/presets/src/algebra.js'

export function presToUCA(p) {
  const uca = this ?? new Uint8ClampedArray(9)
  // if (p.effects) style.call(uca, p.effects)
  hexOntoHsl(p.min, uca, 0)
  hexOntoHsl(p.max, uca, 3)
  hexOntoRgb(p.na ?? p.nan, uca, 6)
  return uca
}

export function ucaToPres(uca) {
  const [ ha, sa, la, hb, sb, lb, rc, gc, bc ] = uca
  return {
    min: hslToInt(ha, sa, la),
    max: hslToInt(hb, sb, lb),
    nan: rc << 16 | gc << 8 | bc,
  }
}