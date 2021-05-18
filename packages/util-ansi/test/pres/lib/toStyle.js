import { iso } from '@vect/object'

export const ofStyle = (...list) => iso(list, true)
export const toStyle = list => iso(list, true)
export const parseStyle = style => {
  if (!style) return 0
  const { bold, underline, blink, inverse, invisible } = style
  return (
    (invisible ? 16 : 0) |
    (inverse ? 8 : 0) |
    (blink ? 4 : 0) |
    (underline ? 2 : 0) |
    (bold ? 1 : 0)
  )
}