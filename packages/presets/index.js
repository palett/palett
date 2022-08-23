import { intToStr } from '@palett/stringify'

export {
  AQUA, ATLAS, AURORA, AZURE, FRESH, INSTA, JUNGLE, LAVA,
  METRO, MOSS, OCEAN, PLANET, POME, SUBTLE, VIOLA
} from './resources/material.js'
export {
  AFRO, ARUBA, AZALE, BERING, BESQUE, BISTRO, BLUSH, BRANDY, DECANTE, DUSKY, ENSIGN, KELLY,
  LILAC, NORSE, PAGODA, PERSIAN, PINE, PRETTY, ROCOCCO, RODD, SANDY, SUMMER, TOBACCO, WINE
} from './resources/pavtone.js'

export { Presets } from './resources/index.js'
export { Preset }  from './src/Preset.js'

export function demo(pres, count) {
  return `${pres.range(count).map(intToStr).join(' ')} | ${pres.nan|> intToStr}`
}

export { randPreset } from './src/randPreset'
export { tapPresets } from './src/tapPresets'
