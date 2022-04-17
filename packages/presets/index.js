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

import { ARUBA }   from './resources/pavtone/aruba'
import { BESQUE }  from './resources/pavtone/besque'
import { DECANTE } from './resources/pavtone/decante'
import { ENSIGN }  from './resources/pavtone/ensign'
import { BISTRO }  from './resources/pavtone/bistro'
import { DUSKY }   from './resources/pavtone/dusky'
import { KELLY }   from './resources/pavtone/kelly'
import { LILAC }   from './resources/pavtone/lilac'
import { SANDY }   from './resources/pavtone/sandy'
import { PAGODA }  from './resources/pavtone/pagoda'
import { PINE }    from './resources/pavtone/pine'
import { FRESH }   from './resources/pavtone/fresh'
import { BRANDY }  from './resources/pavtone/brandy'
import { PERSIAN } from './resources/pavtone/persian'
import { TOBACCO } from './resources/pavtone/tobacco'
import { NORSE }   from './resources/pavtone/norse'
import { BLUSH }   from './resources/pavtone/blush'
import { ROCOCCO } from './resources/pavtone/rococco'
import { PRETTY }  from './resources/pavtone/pretty'
import { WINE }    from './resources/pavtone/wine'

export { AQUA, ATLAS, AURORA, AZURE, MOSS, INSTA, JUNGLE, LAVA, METRO, OCEAN, PLANET, POME, SUBTLE, VIOLA, }
export {
  ARUBA, BESQUE, DECANTE, ENSIGN, BISTRO, DUSKY, KELLY, LILAC, SANDY, PAGODA, PINE, FRESH, BRANDY, PERSIAN, TOBACCO,
  NORSE, BLUSH, ROCOCCO, PRETTY, WINE,
}

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
