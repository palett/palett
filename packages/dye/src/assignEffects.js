import { BLINK, BOLD, HIDE, INVERSE, ITALIC, UNDERLINE } from '@palett/enum-font-effects'
import { SC }                                            from '@palett/util-ansi'

export const assignEffects = function (effects) {
  for (let label of effects)
    label === BOLD ? (this.head += SC + 1, this.tail += SC + 21)
      : label === ITALIC ? (this.head += SC + 3, this.tail += SC + 23)
      : label === UNDERLINE ? (this.head += SC + 4, this.tail += SC + 24)
        : label === BLINK ? (this.head += SC + 5, this.tail += SC + 26)
          : label === INVERSE ? (this.head += SC + 7, this.tail += SC + 27)
            : label === HIDE ? (this.head += SC + 8, this.tail += SC + 28)
              : void 0
  return this
}