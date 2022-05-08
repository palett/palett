import { Preset } from './dist/index'
import { FRESH }  from './resources/pavtone'
import { AQUA }   from './resources/standard/aqua'
import { ATLAS }  from './resources/standard/atlas'
import { AURORA } from './resources/standard/aurora'
import { AZURE }  from './resources/standard/azure'
// import { FRESH }  from './resources/standard/fresh'
import { INSTA }  from './resources/standard/insta'
import { JUNGLE } from './resources/standard/jungle'
import { LAVA }   from './resources/standard/lava'
import { METRO }  from './resources/standard/metro'
import { MOSS }   from './resources/standard/moss'
import { OCEAN }  from './resources/standard/ocean'
import { PLANET } from './resources/standard/planet'
import { POME }   from './resources/standard/pome'
import { SUBTLE } from './resources/standard/subtle'
import { VIOLA }  from './resources/standard/viola'

export { AQUA, ATLAS, AURORA, AZURE, MOSS, INSTA, JUNGLE, LAVA, METRO, OCEAN, PLANET, POME, SUBTLE, VIOLA, }
export {
  BESQUE,
  FRESH,
  RODD,
  AZALE,
  AFRO,
  SUMMER,
  SANDY,
  TOBACCO,
  BRANDY,
  DECANTE,
  BISTRO,
  KELLY,
  PAGODA,
  PINE,
  NORSE,
  ARUBA,
  BERING,
  DUSKY,
  ENSIGN,
  PERSIAN,
  LILAC,
  WINE,
  ROCOCCO,
  PRETTY,
  BLUSH,
}                 from './resources/pavtone/index'

export { Preset } from './src/Preset'

/** @typedef {{max:string,min:string,na:string}} Preset */

/**
 * @type {Object<string,Preset>}
 */
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

export { randPreset } from './src/randPreset'
export { tapPresets } from './src/tapPresets'
