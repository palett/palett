import { HSL }          from '../src/HSL.js'
import { fluo }         from '@palett/fluo'
import { hslToRgb }     from '@palett/convert'
import { deco, logger } from '@spare/logger'

const hsl = HSL.fromRgb([ 92, 92, 255 ])

logger(`[h] (${hsl.h}) [s] (${hsl.s}) [l] (${hsl.l})`)
logger(deco(hsl), deco(hsl.toRgb()))
logger(fluo(hsl.toString(), hslToRgb(hsl)))