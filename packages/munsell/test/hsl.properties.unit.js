import { hslToRgb }     from '@palett/convert'
import { fluo }         from '@palett/fluo'
import { deco, logger } from '@spare/logger'
import { test }         from 'node:test'
import { HSL }          from '../archive/extends/HSL.js'

const hsl = HSL.fromRgb([ 92, 92, 255 ])

test('hsl properties', () => {
  logger(`[h] (${hsl.h}) [s] (${hsl.s}) [l] (${hsl.l})`)
  logger(deco(hsl), deco(hsl.toRgb()))
  logger(fluo(hsl.toString(), hslToRgb(hsl)))
})