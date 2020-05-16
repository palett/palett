'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var comparer = require('@aryth/comparer');
var convert = require('@palett/convert');
var dye = require('@palett/dye');
var numStrict = require('@typen/num-strict');

const STAT_BOUND_CONFIG = {
  dif: true,
  level: 2
};

/**
 * Create a dye from a hsl array
 * @param {[number,number,number]} hsl
 * @returns {function}
 */

const hslToDye = hsl => {
  var _ref, _hsl;

  return _ref = (_hsl = hsl, convert.hslToRgb(_hsl)), dye.Dye(_ref);
};

const leverage = ([h, s, l], base) => [h / base, s / base, l / base];

const scale = (x, min, lever, base, ceil) => comparer.min((comparer.max(x, min) - min) * lever + base, ceil);
const dyeBlender = function (x) {
  var _ref;

  const {
    min: m,
    lever: [rH, rS, rL],
    base: [mH, mS, mL]
  } = this;
  return _ref = [scale(x, m, rH, mH, 360), scale(x, m, rS, mS, 100), scale(x, m, rL, mL, 100)], hslToDye(_ref);
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

// let protoType = function (it) {
const STRING = 'string';

const parseHsl = color => {
  var _color;

  return typeof color === STRING ? (_color = color, convert.hexToHsl(_color)) : color;
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
  return valueLeap.dif && colorLeap.dif.some(n => !!n) ? (blendDye = BlendDye(valueLeap, colorLeap), colorant ? mapper(vec, x => numStrict.isNumeric(x) ? blendDye(x) : primeDye) : mapper(vec, x => {
    var _x, _x2;

    return numStrict.isNumeric(x) ? (_x = x, blendDye(x)(_x)) : (_x2 = x, primeDye(_x2));
  })) : (blendDye = (_colorLeap$min = colorLeap.min, hslToDye(_colorLeap$min)), colorant ? mapper(vec, x => numStrict.isNumeric(x) ? blendDye : primeDye) : mapper(vec, x => {
    var _x3, _x4;

    return numStrict.isNumeric(x) ? (_x3 = x, blendDye(_x3)) : (_x4 = x, primeDye(_x4));
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
  const fn = valueLeap.dif && colorLeap.dif.some(n => !!n) ? (blendDye = BlendDye(valueLeap, colorLeap), colorant ? (x, v) => numStrict.isNumeric(v) ? blendDye(v) : primeDye : (x, v) => {
    var _x, _x2;

    return numStrict.isNumeric(v) ? (_x = x, blendDye(v)(_x)) : (_x2 = x, primeDye(_x2));
  }) : (blendDye = (_colorLeap$min = colorLeap.min, hslToDye(_colorLeap$min)), colorant ? (x, v) => numStrict.isNumeric(v) ? blendDye : primeDye : (x, v) => {
    var _x3, _x4;

    return numStrict.isNumeric(v) ? (_x3 = x, blendDye(_x3)) : (_x4 = x, primeDye(_x4));
  });
  return zipper(keys, values, fn);
};

/**
 *
 * @param {*[]} keys
 * @param {*[]} values
 * @param {Function|function(*[],function(*)):*[]} mapper
 * @param {Function|function(*[],*[],function(*,*)):*[]} zipper
 * @param {Function|function(*[],{dif:boolean,level:number}):{min:number,dif:number}} bound
 * @param {Object} preset
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

exports.BlendDye = BlendDye;
exports.STAT_BOUND_CONFIG = STAT_BOUND_CONFIG;
exports.dyeMap = dyeMap;
exports.dyeZip = dyeZip;
exports.fluoZip = fluoZip;
exports.hslToDye = hslToDye;
exports.leverage = leverage;
exports.presetToFlatDye = presetToFlatDye;
exports.presetToLeap = presetToLeap;
