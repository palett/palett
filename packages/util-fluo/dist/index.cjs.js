'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var comparer = require('@aryth/comparer');
var convert = require('@palett/convert');
var dye = require('@palett/dye');
var numStrict = require('@typen/num-strict');

const BOUND_CONF = {
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

const presetToFlat = ({
  na
}) => {
  var _ref, _na;

  return _ref = (_na = na, parseHsl(_na)), hslToDye(_ref);
};

/**
 *
 * @param {*[]} items
 * @param {*[]} values
 * @param {function(*[],function(*):*):*[]} mapper
 * @param {function} dye
 * @param {{dif:number,min:number}} valueLeap
 * @param {{dif:number[],min:number[]}} colorLeap
 * @param {boolean} colorant
 * @returns {function[]|*[]}
 */

const dyeMap = (items, {
  mapper,
  dye,
  valueLeap,
  colorLeap,
  colorant
}) => {
  var _colorLeap$min;

  let blendDye;
  return valueLeap.dif && colorLeap.dif.some(n => !!n) ? (blendDye = BlendDye(valueLeap, colorLeap), colorant ? mapper(items, x => numStrict.isNumeric(x) ? blendDye(x) : dye) : mapper(items, x => {
    var _x, _x2;

    return numStrict.isNumeric(x) ? (_x = x, blendDye(x)(_x)) : (_x2 = x, dye(_x2));
  })) : (blendDye = (_colorLeap$min = colorLeap.min, hslToDye(_colorLeap$min)), colorant ? mapper(items, x => numStrict.isNumeric(x) ? blendDye : dye) : mapper(items, x => {
    var _x3, _x4;

    return numStrict.isNumeric(x) ? (_x3 = x, blendDye(_x3)) : (_x4 = x, dye(_x4));
  }));
};

/**
 *
 * @param {*[]} items
 * @param {*[]} values
 * @param {function(*[],function(*)):*[]} mapper
 * @param {function(*[],*[],function(*,*)):*[]} zipper
 * @param {function(*):string} dye
 * @param {{dif:number,min:number}} valueLeap
 * @param {{dif:number[],min:number[]}} colorLeap
 * @param {boolean} colorant
 * @returns {function[]|*[]}
 */

const dyeZip = (items, {
  values,
  zipper,
  dye,
  valueLeap,
  colorLeap,
  colorant
}) => {
  var _colorLeap$min;

  let blendDye;
  const fn = valueLeap.dif && colorLeap.dif.some(n => !!n) ? (blendDye = BlendDye(valueLeap, colorLeap), colorant ? (x, v) => numStrict.isNumeric(v) ? blendDye(v) : dye : (x, v) => {
    var _x, _x2;

    return numStrict.isNumeric(v) ? (_x = x, blendDye(v)(_x)) : (_x2 = x, dye(_x2));
  }) : (blendDye = (_colorLeap$min = colorLeap.min, hslToDye(_colorLeap$min)), colorant ? (x, v) => numStrict.isNumeric(v) ? blendDye : dye : (x, v) => {
    var _x3, _x4;

    return numStrict.isNumeric(v) ? (_x3 = x, blendDye(_x3)) : (_x4 = x, dye(_x4));
  });
  return zipper(items, values, fn);
};

/**
 *
 * @param {*[]} items
 * @param {*[]} values
 * @param {Function|function(*[],function(*)):*[]} mapper
 * @param {Function|function(*[],*[],function(*,*)):*[]} zipper
 * @param {Function|function(*[],{dif:boolean,level:number}):{min:number,dif:number}} bound
 * @param {Object} preset
 * @param {boolean} colorant
 * @returns {function[]|*[]}
 */

const fluo = (items, {
  values,
  mapper,
  zipper,
  bound,
  preset,
  colorant = false
} = {}) => {
  var _preset, _preset2, _preset3, _preset4;

  if (!values) return dyeMap(items, {
    mapper,
    dye: (_preset = preset, presetToFlat(_preset)),
    colorLeap: (_preset2 = preset, presetToLeap(_preset2)),
    valueLeap: bound(items, BOUND_CONF),
    colorant
  });
  return dyeZip(items, {
    values,
    mapper,
    zipper,
    dye: (_preset3 = preset, presetToFlat(_preset3)),
    colorLeap: (_preset4 = preset, presetToLeap(_preset4)),
    valueLeap: bound(values, BOUND_CONF),
    colorant
  });
};

exports.BOUND_CONF = BOUND_CONF;
exports.BlendDye = BlendDye;
exports.dyeMap = dyeMap;
exports.dyeZip = dyeZip;
exports.fluo = fluo;
exports.fluoZip = fluo;
exports.hslToDye = hslToDye;
exports.leverage = leverage;
exports.presetToFlat = presetToFlat;
exports.presetToLeap = presetToLeap;
