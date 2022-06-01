'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var math = require('@aryth/math');

const toner = (hsl, dh, ds, dl) => {
  if (dh) hsl[0] = math.restrictAboveZero(hsl[0] + dh, 360);
  if (ds) hsl[1] = math.limitAboveZero(hsl[1] + ds, 100);
  if (dl) hsl[2] = math.limitAboveZero(hsl[2] + dl, 100);
  return hsl;
};

exports.toner = toner;
