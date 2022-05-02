import { Dye }                from '@palett/dye'
import { hexToHsl, PRODUCTS } from '@palett/munsell'
import { logger }             from '@spare/logger'
import { indexed }            from '@vect/object-mapper'
import { filter }             from '@vect/object-select'

const GRAYS = filter(PRODUCTS, (co, _) => (co = hexToHsl(co), co.s < 24 && co.l > 35))

for (let [ hex, name ] of indexed(GRAYS)) {
  const f = Dye.hex(hex)
  logger(`[${f(hex)}] (${f(name)})`)
}