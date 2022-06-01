// export const
//   FUNC = '',
//   PIGM = '',
//   HEX = ''


export const
  MAKER = 'maker',
  RENDER = 'render',
  COLOR = 'color'

export const
  COLORANT = { colorant: MAKER, mutate: false },
  PIGMENT = { colorant: RENDER, mutate: false },
  HEX_COLOR = { colorant: COLOR, mutate: false },
  MUTATE_COLORANT = { colorant: MAKER, mutate: true },
  MUTATE_PIGMENT = { colorant: RENDER, mutate: true },
  MUTATE_HEX_COLOR = { colorant: COLOR, mutate: false }