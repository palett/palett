import { Purple, Teal }          from '@palett/cards'
import { assignHex, dye, Panel } from '@palett/dye'
import { BOLD, ITALIC }          from '@palett/enum-font-effects'
import { logger }         from '@spare/logger'

export function hexToStr(hex) {
  const o = { head: this?.head ?? '', tail: this?.tail ?? '' }
  assignHex.call(o, hex)
  return dye.call(o, hex)
}

const panel=Panel.build().assignStyle()
hexToStr.call({ effects: [ BOLD, ITALIC ] }, Purple.base) |> logger
hexToStr(Teal.base) |> logger