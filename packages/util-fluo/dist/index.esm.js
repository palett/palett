import { Num, STRING } from 'typen';
import { hslToRgb, hexToHsl } from '@palett/convert';
import { Dye } from '@palett/dye';

const STAT_BOUND_CONFIG = {
  dif: true,
  level: 2
};

const {
  isNumeric
} = Num;

/**
 * Create a dye from a hsl array
 * @param {[number,number,number]} hsl
 * @returns {function}
 */

const hslToDye = hsl => {
  var _ref, _hsl;

  return _ref = (_hsl = hsl, hslToRgb(_hsl)), Dye(_ref);
};

const leverage = ([h, s, l], base) => [h / base, s / base, l / base];

const amp = (x, min, lever, base) => (x - min) * lever + base;
const dyeBlender = function (x) {
  var _ref;

  const {
    min: m,
    lever: [rH, rS, rL],
    base: [mH, mS, mL]
  } = this;
  return _ref = [amp(x, m, rH, mH), amp(x, m, rS, mS), amp(x, m, rL, mL)], hslToDye(_ref);
};
/**
 *
 * @param {{min:number,dif:number}} valueLeap
 * @param {{min:number[],dif:number[]}} colorLeap
 * @returns {function(*):function}
 * @constructor
 */

const BlendDye = (valueLeap, colorLeap) => dyeBlender.bind({
  min: valueLeap.min,
  lever: leverage(colorLeap.dif, valueLeap.dif),
  base: colorLeap.min
});

const parseHsl = color => {
  var _color;

  return typeof color === STRING ? (_color = color, hexToHsl(_color)) : color;
};

/**
 *
 * @param max
 * @param min
 * @returns {{dif: [number,number,number], min: [number,number,number]}}
 */

const colorBound = ([maxH, maxS, maxL], [minH, minS, minL]) => ({
  min: [minH, minS, minL],
  dif: [maxH - minH, maxS - minS, maxL - minL]
});

const presetToLeap = ({
  max,
  min
}) => {
  var _max, _min;

  return colorBound((_max = max, parseHsl(_max)), (_min = min, parseHsl(_min)));
};

const presetToFlatDye = ({
  na
}) => {
  var _ref, _na;

  return _ref = (_na = na, parseHsl(_na)), hslToDye(_ref);
};

/**
 *
 * @param {*[]} vec
 * @param {*[]} values
 * @param {function(*[],function(*):*):*[]} mapper
 * @param {function} primeDye
 * @param {{dif:number,min:number}} valueLeap
 * @param {{dif:number[],min:number[]}} colorLeap
 * @param {boolean} colorant
 * @returns {function[]|*[]}
 */

const dyeMap = (vec, {
  mapper,
  primeDye,
  valueLeap,
  colorLeap,
  colorant
}) => {
  var _colorLeap$min;

  let blendDye;
  return valueLeap.dif && colorLeap.dif.some(n => !!n) ? (blendDye = BlendDye(valueLeap, colorLeap), colorant ? mapper(vec, x => isNumeric(x) ? blendDye(x) : primeDye) : mapper(vec, x => {
    var _x, _x2;

    return isNumeric(x) ? (_x = x, blendDye(x)(_x)) : (_x2 = x, primeDye(_x2));
  })) : (blendDye = (_colorLeap$min = colorLeap.min, hslToDye(_colorLeap$min)), colorant ? mapper(vec, x => isNumeric(x) ? blendDye : primeDye) : mapper(vec, x => {
    var _x3, _x4;

    return isNumeric(x) ? (_x3 = x, blendDye(_x3)) : (_x4 = x, primeDye(_x4));
  }));
};

/**
 *
 * @param {*[]} keys
 * @param {*[]} values
 * @param {function(*[],function(*)):*[]} mapper
 * @param {function(*[],*[],function(*,*)):*[]} zipper
 * @param {function(*):string} primeDye
 * @param {{dif:number,min:number}} valueLeap
 * @param {{dif:number[],min:number[]}} colorLeap
 * @param {boolean} colorant
 * @returns {function[]|*[]}
 */

const dyeZip = (keys, {
  values,
  mapper,
  zipper,
  primeDye,
  valueLeap,
  colorLeap,
  colorant
}) => {
  var _colorLeap$min;

  if (!values) return dyeMap(keys, {
    mapper,
    primeDye,
    valueLeap,
    colorLeap,
    colorant
  });
  let blendDye;
  const fn = valueLeap.dif && colorLeap.dif.some(n => !!n) ? (blendDye = BlendDye(valueLeap, colorLeap), colorant ? (x, v) => isNumeric(v) ? blendDye(v) : primeDye : (x, v) => {
    var _x, _x2;

    return isNumeric(v) ? (_x = x, blendDye(v)(_x)) : (_x2 = x, primeDye(_x2));
  }) : (blendDye = (_colorLeap$min = colorLeap.min, hslToDye(_colorLeap$min)), colorant ? (x, v) => isNumeric(v) ? blendDye : primeDye : (x, v) => {
    var _x3, _x4;

    return isNumeric(v) ? (_x3 = x, blendDye(_x3)) : (_x4 = x, primeDye(_x4));
  });
  return zipper(keys, values, fn);
};

/**
 *
 * @param {*[]} keys
 * @param {*[]} values
 * @param {function(*[],function(*)):*[]} mapper
 * @param {function(*[],*[],function(*,*)):*[]} zipper
 * @param {function(*[],{dif:boolean,level:number}):{min:number,dif:number}} bound
 * @param {{max:string,min:string,na:string}} preset
 * @param {boolean} colorant
 * @returns {function[]|*[]}
 */

const fluoZip = (keys, {
  values,
  mapper,
  zipper,
  bound,
  preset,
  colorant = false
} = {}) => {
  var _preset, _preset2;

  return dyeZip(keys, {
    values,
    mapper,
    zipper,
    primeDye: (_preset = preset, presetToFlatDye(_preset)),
    colorLeap: (_preset2 = preset, presetToLeap(_preset2)),
    valueLeap: bound(values || keys, STAT_BOUND_CONFIG),
    colorant
  });
};

export { BlendDye, STAT_BOUND_CONFIG, dyeMap, dyeZip, fluoZip, hslToDye, isNumeric, leverage, presetToFlatDye, presetToLeap };
