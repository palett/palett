import { chainEnclose, CLR_FORE, ConsoleColors, FORE } from '@palett/util-ansi'

export const render = (tx, { color, head, tail } = {}) => {
  let h = Array.isArray(color)
    ? [ FORE ].concat(color.slice(0, 3))
    : [ ConsoleColors[color] || ConsoleColors.white ],
      t = [ CLR_FORE ], ve
  if (head && (ve = Object.values(head)) && ve.length) h = h.concat(ve)
  if (tail && (ve = Object.values(tail)) && ve.length) t = t.concat(ve)
  return chainEnclose(h) + tx + chainEnclose(t)
}
