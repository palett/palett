import { flopEntry }          from '@aryth/rand'
import { Presets }            from '@palett/presets'
import { decoPale }           from '@spare/logger'
import { STR }                from '@typen/enum-data-types'
import { indexed, indexedTo } from '@vect/object-mapper'
import { Fluo }               from '../src/Fluo.js'

const proc = o => {
  for (let k in o) {
    const vec = o[k]
    vec.width = 0
    for (let i = 0, x; i < vec.length; i++) { if (typeof (x = vec[i]) === STR || x.length > vec.width) vec.width = x.length}
  }
  return o
}

const candidates = {
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
} |> proc

const randPres = () => {
  let [ posName, pos ] = flopEntry(Presets)
  let [ negName, neg ] = flopEntry(Presets)
  let [ strName, str ] = flopEntry(Presets)
  pos.name = posName
  neg.name = negName
  str.name = strName
  pos = null
  neg = null
  return { pos, neg, str }
}
for (let [ key, vec ] of indexed(candidates)) {
  const pres = randPres()
  // const pres = null
  const presNames = [ ...indexedTo(pres, (_, o) => o?.name ?? '-') ];
  `[${key}] (${presNames})` |> console.log;
  (new Fluo(pres)).project(vec) |> decoPale |> console.log
}