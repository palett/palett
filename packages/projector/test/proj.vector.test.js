import { bound }            from '@aryth/bound-vector'
import { VectorCollection } from '@foba/vector-number'
import { hslToHex }         from '@palett/convert'
import { BOLD, ITALIC }     from '@palett/enum-font-effects'
import { FRESH, Preset }    from '@palett/presets'
import { DecoMatrix }       from '@spare/logger'
import { Proj }             from '../src/Proj'
import { indexed }          from '@vect/object-mapper'
import { iso }              from '@vect/vector'
import { hexToStr }         from '@palett/stringify'

const entries = [
  ...indexed(VectorCollection),
  ['identical', len => iso.call(null, len, 12)]
]

for (const [key, construct] of entries) {
  const vector = construct(7)
  const proj = Proj.from(bound(vector), Preset.from(FRESH, [BOLD, ITALIC]))
  const rows = [
    vector.map(n => proj.into(n)|> hslToHex|> hexToStr),
    vector.map(n => proj.render(n, n))
  ];
  `>> ${key}` |> console.log
  rows |> DecoMatrix({ presets: [] }) |> console.log

}
