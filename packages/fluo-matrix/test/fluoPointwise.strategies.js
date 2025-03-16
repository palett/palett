import { NumberMatrixCollection, StringMatrixCollection } from '@foba/matrix'
import { makeEmbedded }                                   from '@foba/util'
import { FRESH, METRO }                                   from '@palett/presets'
import { BRACKET }                                        from '@spare/enum-brackets'
import { Liner }                                          from '@spare/liner'
import { decoCrostab, logger, says }                      from '@spare/logger'
import { strategies }                                     from '@valjoux/strategies'
import { dateTime }                                       from '@valjoux/timestamp-pretty'
import { mapper }                                         from '@vect/matrix'
import { fluoByPoints }                                   from '../src/fluoByPoints'

const test = () => {
  const { lapse, result } = strategies({
    repeat: 1E+4,
    candidates: {
      marketingMovement: StringMatrixCollection['marketingMovement'],
      integratedCultureFramework: StringMatrixCollection['integratedCultureFramework'],
      zigZagMatrix: NumberMatrixCollection['zigZagMatrix'](6),
    } |> makeEmbedded,
    methods: {
      arch: x => x,
      dev: x => fluoByPoints(x, [ { preset: METRO }, { preset: FRESH } ]),
      edge: x => fluoByPoints(mapper(x, v => String(v).trim()), [ { preset: METRO }, { preset: FRESH } ]),
    },
  })
  lapse |> decoCrostab |> says['lapse'].p(dateTime())
  '' |> logger
  result |> decoCrostab |> says['result'].p(dateTime())
  '' |> logger
  const FUNCTION_TAG = 'dev'
  const deco = mx => mx.map(vec => '[ ' + vec.join(', ') + ' ]') |> Liner({ level: 0, bracket: BRACKET })
  for (let member of result.side)
    result.cell(member, FUNCTION_TAG) |> deco |> says[member].br(FUNCTION_TAG)
}
test()