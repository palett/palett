import { round, E3, restrictAboveZero, limitAboveZero } from '@aryth/math';

function hexAt(tx, i) {
  let n = tx.charCodeAt(i);
  return n >> 5 <= 1 ? n & 0xf : (n & 0x7) + 9;
}

const prolif = n => n << 4 | n;

function dil6(hex) {
  const hi = hex === null || hex === void 0 ? void 0 : hex.length;
  if (hi >= 6) return hex;
  if (hi === 5) return '0' + hex;
  if (hi === 4) return '00' + hex;
  if (hi === 3) return '000' + hex;
  if (hi === 2) return '0000' + hex;
  if (hi === 1) return '00000' + hex;
  if (hi <= 0) return '000000';
}
/**
 *
 * @param {number} n
 * @param {number} h
 * @param {number} a
 * @param {number} l
 * @returns {number}
 */


const hf = (n, h, a, l) => {
  const k = (n + h / 30) % 12;
  return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
};
/**
 * @param {string} hex
 * @returns {number}
 */


function hexToInt(hex) {
  let lo = 0,
      hi = hex === null || hex === void 0 ? void 0 : hex.length;
  if (hi === 7) lo++, hi--;

  if (hi === 6) {
    const r = hexAt(hex, lo++) << 4 | hexAt(hex, lo++);
    const g = hexAt(hex, lo++) << 4 | hexAt(hex, lo++);
    const b = hexAt(hex, lo++) << 4 | hexAt(hex, lo++);
    return r << 16 | g << 8 | b;
  }

  if (hi === 4) lo++, hi--;

  if (hi === 3) {
    return prolif(hexAt(hex, lo++)) << 16 | prolif(hexAt(hex, lo++)) << 8 | prolif(hexAt(hex, lo++));
  }

  return 0;
}

function rgbToInt([r, g, b]) {
  return ((r & 0xFF) << 16) + ((g & 0xFF) << 8) + (b & 0xFF);
}
/** @returns {RGB} */


function hslToRgb(hsl) {
  let [h, s, l] = hsl;
  s /= 100, l /= 100;
  const au = s * Math.min(l, 1 - l),
        r = hf(0, h, au, l),
        g = hf(8, h, au, l),
        b = hf(4, h, au, l);
  return (this ?? Array)(round(r * 0xFF), round(g * 0xFF), round(b * 0xFF)); // return [r * 0xFF & 0xFF, g * 0xFF & 0xFF, b * 0xFF & 0xFF]
}

const hslToHex = hsl => {
  var _ref, _hsl;

  return _ref = (_hsl = hsl, hslToRgb(_hsl)), rgbToHex(_ref);
};
/**
 * @param {[*,*,*]|RGB} rgb
 * @returns {string}
 */


const rgbToHex = rgb => '#' + dil6(rgbToInt(rgb).toString(16));
/**
 * @param r
 * @param g
 * @param b
 * @returns {HSL}
 */


function fracToHsl(r, g, b) {
  let hi = r,
      lo = r;
  {
    if (g > r) {
      hi = g;
    } else {
      lo = g;
    }

    if (b > hi) hi = b;
    if (b < lo) lo = b;
  }
  const sm = hi + lo,
        df = hi - lo;
  const h = hue(r, g, b, hi, df) * 60,
        s = !df ? 0 : sm > 1 ? df / (2 - sm) : df / sm,
        l = sm / 2;
  return this(round(h), round(s * E3) / 10, round(l * E3) / 10);
}

const hue = (r, g, b, max, dif) => {
  if (dif === 0) return 0;

  switch (max) {
    case r:
      return ((g - b) / dif + (g < b ? 6 : 0)) % 6;

    case g:
      return (b - r) / dif + 2;

    case b:
      return (r - g) / dif + 4;
  }
};
/** @typedef {[*,*,*]|{h,s,l}|HSL} HSL [Hue([0,360]), Saturation([0,100]), Lightness([0,100])] */

/** @returns {HSL} */


function hexToHsl(hex) {
  return intToHsl.call(this ?? Array, hexToInt(hex));
}
/** @returns {HSL} */


function intToHsl(int) {
  let r = int >> 16 & 0xFF,
      g = int >> 8 & 0xFF,
      b = int & 0xFF;
  return fracToHsl.call(this ?? Array, r / 255, g / 255, b / 255);
}

function toner(hex, dh, ds, dl) {
  let hsl = hexToHsl(hex);
  if (dh) hsl[0] = restrictAboveZero(hsl[0] + dh, 360);
  if (ds) hsl[1] = limitAboveZero(hsl[1] + ds, 100);
  if (dl) hsl[2] = limitAboveZero(hsl[2] + dl, 100);
  return hslToHex(hsl);
}

export { toner };
