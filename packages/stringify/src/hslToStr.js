import { Fluo } from '@palett/fluo'

export function hslToStr(hsl) { return Fluo.hsl.call(this, hsl, hsl) }