import { round } from '@aryth/math';
import { SGR, CSI, FORE_INI, FORE_DEF } from '@palett/enum-ansi-codes';
import { SC } from '@palett/util-ansi';
import { hexToInt, hslToInt } from '@palett/convert';

function padN3(v) { return String(round(v)).padStart(3) }

function xyzToStr(x, y, z) {
  return `[${padN3(x)},${padN3(y)},${padN3(z)}]`
}

const HEAD = CSI + '1;' + FORE_INI + SC;
const TAIL = CSI + FORE_DEF + '21;' + SGR;
function render(r, g, b, text) {
  const h = this?.head ?? HEAD, t = this?.tail ?? TAIL;
  return h + r + SC + g + SC + b + SGR + text + t
}

/**
 *
 * @param {number} int
 * @return {string}
 */
function intToStr(int) {
  let r = int >> 16, g = int >> 8, b = int >> 0;
  return render.call(this, r & 0xFF, g & 0xFF, b & 0xFF, int.toString().padStart(8, '0'))
}

/**
 *
 * @param {number} int
 * @return {string}
 */
function intToSpec(int) {
  let r = int >> 16, g = int >> 8, b = int >> 0;
  return render.call(this, r &= 0xFF, g &= 0xFF, b &= 0xFF, int.toString().padStart(8, '0') + ' ' + xyzToStr(r, g, b))
}

/**
 * `[38;2;${head}${r};${g};${b}m${text}[${tail}39m`
 * @param {number[]} rgb
 * @return {string}
 */
function rgbToStr([ r, g, b ]) {
  return render.call(this, r &= 0xFF, g &= 0xFF, b &= 0xFF, xyzToStr(r, g, b))
}

/**
 *
 * @param {string} hex
 * @return {string}
 */
function hexToStr(hex) {
  hex = hex?.toUpperCase();
  const int = hexToInt(hex);
  let r = int >> 16, g = int >> 8, b = int >> 0;
  return render.call(this, r & 0xFF, g & 0xFF, b & 0xFF, hex)
}

function hexToSpec(hex) {
  hex = hex?.toUpperCase();
  const int = hexToInt(hex);
  let r = int >> 16, g = int >> 8, b = int >> 0;
  return render.call(this, r &= 0xFF, g &= 0xFF, b &= 0xFF, hex + ' ' + xyzToStr(r, g, b))
}

/**
 *
 * @param {number[]} hsl
 * @return {string}
 */
function hslToStr(hsl) {
  const int = hslToInt(hsl);
  let r = int >> 16, g = int >> 8, b = int >> 0;
  return render.call(this, r & 0xFF, g & 0xFF, b & 0xFF, xyzToStr(hsl[0], hsl[1], hsl[2]))
}

export { hexToSpec, hexToStr, hslToStr, intToSpec, intToStr, render, rgbToStr, xyzToStr };
