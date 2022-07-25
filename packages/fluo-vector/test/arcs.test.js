import { indexed } from '@vect/object-mapper'
import { mapper }  from '@vect/vector-mapper'
import { Arcs }    from '../src/Arcs'

const candidates = {
  empty: [],
  one_zero: [ 0 ],
  one_nan: [ NaN ],
  asc_6: [ 0, 1, 2, 3, 4, 5 ],
  desc_6: [ 5, 4, 3, 2, 1, 0 ],
  misc: [ false, 101, 102, 103, 104 ],
  misc2: [ 1, 2, NaN, 4, 5 ],
  upTo5: [ '0', '01', '012', '0123', '01234' ],
  tx_nums: [ '244', '200', '306', '400', '150', '220', '190', '495' ],
  tx_strs: 'comprehend how it\'s driven by animal spirits'.split(' '),
  dates: [ '2022-01-31', '2022-02-28', '2022-03-31', '2022-06-30', '2022-09-30', '2022-12-31' ],
  words: [ 'Alexander', 'Caesar', 'Putin', 'Hannibal', 'Farnese', 'Charles', 'Frederick', 'Napoleon' ],
  tx_padded: [ '  8', ' 64', '128', '1024', 'digits', '' ],
}

for (let [ key, vec ] of indexed(candidates)) {
  key |> console.log
  vec |> console.log
  const arcs = Arcs.from(vec)
  arcs.boundInfo() |> console.log
  mapper(arcs, x => x) |> console.log
  // arcs.map(x => x) |> console.log
}
