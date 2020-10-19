import { AQUA }   from './resources/aqua'
import { ATLAS }  from './resources/atlas'
import { AURORA } from './resources/aurora'
import { AZURE }  from './resources/azure'
import { FRESH }  from './resources/fresh'
import { INSTA }  from './resources/insta'
import { JUNGLE } from './resources/jungle'
import { LAVA }   from './resources/lava'
import { METRO }  from './resources/metro'
import { MOSS }   from './resources/moss'
import { OCEAN }  from './resources/ocean'
import { PLANET } from './resources/planet'
import { POME }   from './resources/pome'
import { SUBTLE } from './resources/subtle'
import { VIOLA }  from './resources/viola'

export { AQUA, ATLAS, AURORA, AZURE, FRESH, MOSS, INSTA, JUNGLE, LAVA, METRO, OCEAN, PLANET, POME, SUBTLE, VIOLA, }

export const Presets = {
  aqua: AQUA,
  atlas: ATLAS,
  aurora: AURORA,
  azure: AZURE,
  fresh: FRESH,
  moss: MOSS,
  jungle: JUNGLE,
  ocean: OCEAN,
  lava: LAVA,
  planet: PLANET,
  metro: METRO,
  subtle: SUBTLE,
  insta: INSTA,
  pome: POME,
  viola: VIOLA
}

export { randPreset }   from './src/randPreset'
export { tapPresets }   from './src/tapPresets'
export { presetToFlat } from './src/presetReader/presetToFlat'
export { presetToLeap } from './src/presetReader/presetToLeap'
