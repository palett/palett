import { flopEntry }          from '@aryth/rand'
import { Presm }              from '@palett/pres'
import {
  AFRO, ARUBA, AZALE, BERING, BESQUE, BISTRO, BLUSH, BRANDY, DECANTE, DUSKY, ENSIGN, KELLY, LILAC, NORSE, PAGODA,
  PERSIAN, PINE, PRETTY, ROCOCCO, RODD, SANDY, SUMMER, TOBACCO, TROPIC, WINE,
}                             from '@palett/presets'
import { STR }                from '@typen/enum-data-types'
import { indexed, indexedTo } from '@vect/object-mapper'
import { test }               from 'node:test'
import { Fluo }               from '../src/Fluo.js'

const proc = o => {
  for (let k in o) {
    const vec = o[k]
    vec.width = 0
    for (let i = 0, x; i < vec.length; i++) {
      if (typeof (x = vec[i]) === STR || x.length > vec.width) vec.width = x.length
    }
  }
  return o
}

const PRESETS = {
  BESQUE: BESQUE,
  TROPIC: TROPIC,
  RODD: RODD,
  AZALE: AZALE,
  AFRO: AFRO,
  SUMMER: SUMMER,
  SANDY: SANDY,
  TOBACCO: TOBACCO,
  BRANDY: BRANDY,
  DECANTE: DECANTE,
  BISTRO: BISTRO,
  KELLY: KELLY,
  PAGODA: PAGODA,
  PINE: PINE,
  NORSE: NORSE,
  ARUBA: ARUBA,
  BERING: BERING,
  DUSKY: DUSKY,
  ENSIGN: ENSIGN,
  PERSIAN: PERSIAN,
  LILAC: LILAC,
  WINE: WINE,
  ROCOCCO: ROCOCCO,
  PRETTY: PRETTY,
  BLUSH: BLUSH,
}

const candidates = proc({
  // empty: [],
  // one_zero: [ 0 ],
  // one_nan: [ NaN ],
  // asc_6: [ 0, 1, 2, 3, 4, 5 ],
  // desc_6: [ 5, 4, 3, 2, 1, 0 ],
  // misc: [ false, 101, 102, 103, 104 ],
  // misc2: [ 1, 2, NaN, 4, 5 ],
  upTo5: [ '0', '01', '012', '0123', '01234' ],
  tx_nums: [ '244', '200', '306', '400', '150', '220', '190', '495' ],
  tx_strs: 'comprehend how it\'s driven by animal spirits'.split(' '),
  dates: [ '2022-01-31', '2022-02-28', '2022-03-31', '2022-06-30', '2022-09-30', '2022-12-31' ],
  words: [ 'Alexander the Great', 'Caesar', 'Putin', 'Hannibal', 'Farnese', 'Charles', 'Frederick', 'Napoleon' ],
  tx_padded: [ '  8', ' 32', ' 64', '108', '0', '-8', '-24', '-36', 'digit', 'bit', '~~~', '-', '' ],
})

const randPresm = () => {
  let [ posName, pos ] = flopEntry(PRESETS)
  let [ negName, neg ] = flopEntry(PRESETS)
  let [ strName, str ] = flopEntry(PRESETS)
  pos.name = posName
  neg.name = negName
  str.name = strName
  return Presm.build(str, pos, neg)
}

test('fluo project', () => {
  for (let [ key, vec ] of indexed(candidates)) {
    const presm = randPresm()
    // const pres = null
    const presNames = [ ...indexedTo(presm, (_, o) => o?.name ?? '-') ]
    console.log(`[${key}] (${presNames})`)
    console.log(Fluo.vector(vec, presm).join(', '))
    // console.log(decoPale(Fluo.vector(vec, { pres })))
  }
})
