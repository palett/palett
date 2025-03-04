import { Preset } from '@palett/pres'
import {
  Amber, Blue, BlueGrey, Brown, Cyan, DeepOrange, DeepPurple, Green, Grey,
  Indigo, LightBlue, LightGreen, Lime, Orange, Pink, Purple, Red, Teal, Yellow
}                 from '@palett/cards'

export const METRO = Preset.build(Blue.lighten_4, Pink.lighten_2, Teal.accent_3)
export const AQUA = Preset.build(Green.darken_1, Cyan.accent_2, Grey.lighten_4)
export const ATLAS = Preset.build(Orange.lighten_2, Cyan.lighten_3, Pink.lighten_4)
export const AURORA = Preset.build(DeepPurple.accent_1, Green.accent_3, Teal.accent_1)
export const AZURE = Preset.build(LightBlue.accent_4, Cyan.accent_1, DeepOrange.accent_1)
export const FRESH = Preset.build(DeepOrange.accent_3, LightGreen.accent_3, Blue.lighten_3)
export const INSTA = Preset.build(Purple.accent_1, Orange.accent_2, Grey.lighten_2)
export const JUNGLE = Preset.build(LightGreen.accent_3, Lime.accent_3, BlueGrey.accent_1)
export const LAVA = Preset.build(Red.lighten_1, Amber.accent_3, Grey.accent_2)
export const MOSS = Preset.build(Teal.lighten_3, LightGreen.accent_3, Brown.accent_1)
export const OCEAN = Preset.build(Indigo.base, LightBlue.accent_2, Pink.lighten_3)
export const PLANET = Preset.build(Blue.darken_3, Teal.accent_2, Cyan.lighten_4)
export const POME = Preset.build(Yellow.darken_1, Red.lighten_2, Green.lighten_2)
export const SUBTLE = Preset.build(Grey.darken_1, Grey.lighten_5, Indigo.lighten_3)
export const VIOLA = Preset.build(DeepPurple.accent_2, Pink.lighten_4, Amber.darken_2)
