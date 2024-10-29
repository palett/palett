// export const
//   FUNC = '',
//   PIGM = '',
//   HEX = ''


const MAKER = 'maker',
  RENDER = 'render',
  COLOR = 'color';

const COLORANT = { colorant: MAKER, mutate: false },
  PIGMENT = { colorant: RENDER, mutate: false },
  HEX_COLOR = { colorant: COLOR, mutate: false },
  MUTATE_COLORANT = { colorant: MAKER, mutate: true },
  MUTATE_PIGMENT = { colorant: RENDER, mutate: true },
  MUTATE_HEX_COLOR = { colorant: COLOR, mutate: false };

export { COLOR, COLORANT, HEX_COLOR, MAKER, MUTATE_COLORANT, MUTATE_HEX_COLOR, MUTATE_PIGMENT, PIGMENT, RENDER };
