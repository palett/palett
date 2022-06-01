'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// export const
//   FUNC = '',
//   PIGM = '',
//   HEX = ''
const MAKER = 'maker',
      RENDER = 'render',
      COLOR = 'color';
const COLORANT = {
  colorant: MAKER,
  mutate: false
},
      PIGMENT = {
  colorant: RENDER,
  mutate: false
},
      HEX_COLOR = {
  colorant: COLOR,
  mutate: false
},
      MUTATE_COLORANT = {
  colorant: MAKER,
  mutate: true
},
      MUTATE_PIGMENT = {
  colorant: RENDER,
  mutate: true
},
      MUTATE_HEX_COLOR = {
  colorant: COLOR,
  mutate: false
};

exports.COLOR = COLOR;
exports.COLORANT = COLORANT;
exports.HEX_COLOR = HEX_COLOR;
exports.MAKER = MAKER;
exports.MUTATE_COLORANT = MUTATE_COLORANT;
exports.MUTATE_HEX_COLOR = MUTATE_HEX_COLOR;
exports.MUTATE_PIGMENT = MUTATE_PIGMENT;
exports.PIGMENT = PIGMENT;
exports.RENDER = RENDER;
