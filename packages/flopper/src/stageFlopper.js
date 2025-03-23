import { almostEqual } from '@aryth/math'
import { n }           from '@aryth/norm'
import { rand }        from '@aryth/rand'
import { Munsell }     from '@palett/munsell'
import { MIDTONE }     from './asset/MIDTONE.js'
import { randHSI }     from './utils/randHSI.js'
import { hsiToPres }   from './utils/randPres.js'


export function* stageFlopper(stage = 24, stdev = 3) {
  function nextStage(stage) {
    let next = stage
    while (almostEqual(stage, next, stage >> 1)) next += n(stage)
    return next
  }
  const munsell = this instanceof Munsell ? this : Munsell.build(this ?? MIDTONE, 48, 48)
  let prev = rand(360)
  while (true) {
    const curr = prev + n(stdev)
    yield hsiToPres.call(munsell, randHSI(curr))
    prev = curr + nextStage(stage)
  }
}

