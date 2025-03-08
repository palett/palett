import { OCEAN, PAGODA, SUBTLE } from '@palett/presets'
import { $, deco }               from '@spare/logger'
import { test }                  from 'node:test'
import { Presm }                 from '../src/Presm.js'

test('presm test', () => {
  const conf = { str: SUBTLE, pos: OCEAN, neg: PAGODA }
  const presm = Presm.build(SUBTLE, OCEAN, PAGODA)
  console.log(conf)
  console.log(presm)
  console.log(deco(presm))

  console.log($.xbd(presm.xbd).ybd(presm.ybd).zbd(presm.zbd))

  // const str = [ ...presm.iterStr() ]
  // const pos = [ ...presm.iterPos() ]
  // const neg = [ ...presm.iterNeg() ]
  // console.log($['str'](str)['pos'](pos)['neg'](neg))
})