import { says }       from '@palett/says'
import { fluoVec }    from '../src/fluoVec'
import { candidates } from './alpha/candidates'

for (let [k, vector] of Object.entries(candidates)) {
  fluoVec.call(
    { mutate: false, colorant: false },
    vector,
    // [
    //   { preset: FRESH, filter: isNumeric, mapper: x => x },
    //   { preset: PLANET, filter: isLiteral, mapper: stringValue }
    // ]
  ) |> says[k]
}
