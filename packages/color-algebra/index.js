import { rec0up, lim0up } from '@aryth/math';
import { hexToHsl, hslToHex, rgbToHsl, hslToRgb, ff, rgiToHex, rgiToRgb, hue, channel } from '@palett/convert';

function toneHex(hex, dh, ds, dl) {
  let hsl = hexToHsl(hex);
  toneHsl(hsl, dh, ds, dl);
  return hslToHex(hsl)
}

function toneHsl(hsl, dh, ds, dl) {
  if (dh) hsl[0] = rec0up(hsl[0] + dh, 360);
  if (ds) hsl[1] = lim0up(hsl[1] + ds, 100);
  if (dl) hsl[2] = lim0up(hsl[2] + dl, 100);
  return hsl
}

function toneRgb(rgb, dh, ds, dl) {
  let hsl = rgbToHsl(rgb);
  toneHsl(hsl, dh, ds, dl);
  return hslToRgb(hsl)
}

function dslHex(hex, ds, dl) {
  const rgi = dslRga(ff(hex, 1), ff(hex, 3), ff(hex, 5), ds, dl);
  return rgiToHex(rgi)
}

function dslRgb(rgb, ds, dl) {
  const rgi = dslRga(rgb[0], rgb[1], rgb[2], ds, dl);
  return rgiToRgb(rgi)
}

function dslRga(r, g, b, ds, dl) {
  let hi, lo;
  g > r ? (hi = g, lo = r) : (hi = r, lo = g);
  b > hi ? hi = b : b < lo ? lo = b : void 0;
  let tt = hi + lo, df = hi - lo,
    h = hue(r, g, b, hi, df) * 2, // h ∈ [0,6) → h*=2 → h ∈ [0,12)
    s = !df ? 0 : df / (tt > 255 ? (510 - tt) : tt), // s ∈ [0,1]
    l = tt / 2; // l ∈ [0,510], tt ∈ [0,255]
  s += ds / 100;  // ds ∈ [0,  1]
  l += dl * 2.55; // dl ∈ [0,255]
  s = s < 0 ? 0 : s > 1 ? 1 : s;
  l = l < 0 ? 0 : l > 255 ? 255 : l;
  const amp = s * (l <= 127.5 ? l : 255 - l);  // When lightness is low, increase it proportionally to saturation, 亮度系数, coefficient or chroma
  r = channel(0, h, amp, l);
  g = channel(8, h, amp, l);
  b = channel(4, h, amp, l);
  r = ~~(r + 0.5), g = ~~(g + 0.5), b = ~~(b + 0.5);
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}

export { dslHex, dslRga, dslRgb, toneHex, toneHsl, toneRgb };
