import { round }                 from '@aryth/math'
import { OCEAN, PAGODA, SUBTLE } from '@palett/presets'
import { $ }                     from '@spare/logger'
import { mutate }                from '@vect/vector-mapper'
import { test }                  from 'node:test'
import { Presm }                 from '../src/Presm.js'

test('prespec test', () => {
  mutate(SUBTLE, round, 6)
  mutate(OCEAN, round, 6)
  mutate(PAGODA, round, 6)
  const conf = { str: SUBTLE, pos: OCEAN, neg: PAGODA }
  const presm = Presm.build(conf)
  console.log(conf)
  console.log(presm)
  console.log($['str'](presm.str)['pos'](presm.pos)['neg'](presm.neg))

  const str = [ ...presm.iterStr() ]
  const pos = [ ...presm.iterPos() ]
  const neg = [ ...presm.iterNeg() ]
  console.log($['str'](str)['pos'](pos)['neg'](neg))
})