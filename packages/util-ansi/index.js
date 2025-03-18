import { hexToInt, hslToRgb } from '@palett/convert';

const CLR_ALL = '0';
const ESC = '';

const CSI = '[';
const SGR = 'm';
const L = '[';
const R = 'm';
const SC = ';';

const FORE = '38;2';
const BACK = '48;2';
const CLR_FORE = '39';
const CLR_BACK = '49';

// const Scopes = {
//   fore: '38;2',
//   back: '48;2',
// }

const
  BLACK = '30',
  RED = '31',
  GREEN = '32',
  YELLOW = '33',
  BLUE = '34',
  MAGENTA = '35',
  CYAN = '36',
  WHITE = '37',
  GREY = '90';

const ConsoleColors = {
  black: BLACK,
  red: RED,
  green: GREEN,
  yellow: YELLOW,
  blue: BLUE,
  magenta: MAGENTA,
  cyan: CYAN,
  white: WHITE,
  grey: GREY,
};

// export const colors = {
//   black: 30,
//   Red: 31,
//   Green: 32,
//   Yellow: 33,
//   Blue: 34,
//   magenta: 35,
//   Cyan: 36,
//   white: 37,
//   Grey: 90,
// }

const BOLD = '1';
const ITALIC = '3';
const UNDERLINE = '4';
const INVERSE = '7';
const CLR_BOLD = '22';
const CLR_ITALIC = '23';
const CLR_UNDERLINE = '24';
const CLR_INVERSE = '27';

const Effects = {
  bold: [ BOLD, CLR_BOLD ],
  italic: [ ITALIC, CLR_ITALIC ],
  underline: [ UNDERLINE, CLR_UNDERLINE ],
  inverse: [ INVERSE, CLR_INVERSE ],
};

/**
 *
 * @param {string[]} codes
 * @returns {string}
 */
const chainEnclose = codes => CSI + codes.join(SC) + SGR;

/**
 *
 * @param {string} code
 * @returns {string}
 */
const enclose = code => CSI + code + SGR;

/**
 *
 * @param {number[]} rgb - array of three integers, each from 0 to 255
 * @returns {string}
 */
const rgbToAnsi = (rgb) => FORE + SC + rgb[0] + SC + rgb[1] + SC + rgb[2];

const hexToAnsi = (hex) => {
  const int = hexToInt(hex);
  return FORE + SC + (int >> 16 & 0xFF) + SC + (int >> 8 & 0xFF) + SC + (int & 0xFF)
};

const hslToAnsi = (hsl) => rgbToAnsi(hslToRgb(hsl));

const concatSgr = (tx, el) => (
  tx?.length
    ? el?.length ? tx + ';' + el : tx
    : el
) ?? '';

const hexToForeSgra = hex => {
  if (!hex?.length) return ''
  const n = hexToInt(hex);
  const r = n >> 16 & 0xff, g = n >> 8 & 0xff, b = n & 0xff;
  return `38;2;${r};${g};${b}`
};

const hexToBackSgra = hex => {
  if (!hex?.length) return ''
  const n = hexToInt(hex);
  const r = n >> 16 & 0xff, g = n >> 8 & 0xff, b = n & 0xff;
  return `48;2;${r};${g};${b}`
};

export { BACK, CLR_ALL, CLR_BACK, CLR_FORE, ConsoleColors, ESC, Effects, FORE, L, R, SC, chainEnclose, concatSgr, enclose, hexToAnsi, hexToBackSgra, hexToForeSgra, hslToAnsi, rgbToAnsi };
