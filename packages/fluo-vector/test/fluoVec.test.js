import { FRESH, PLANET } from '@palett/presets'
import { says }          from '@palett/says'
import { stringValue }   from '@spare/string'
import { isLiteral }     from '@typen/literal'
import { isNumeric }     from '@typen/num-strict'
import { fluoVec }       from '../src/fluoVec'
import { candidates }    from './alpha/candidates'

for (let [k, vector] of Object.entries(candidates)) {
  fluoVec.call(
    { mutate: false, colorant: false },
    vector,
    { preset: FRESH, filter: isNumeric, mapper: x => x },
    { preset: PLANET, filter: isLiteral, mapper: stringValue }
  ) |> says[k]
}
