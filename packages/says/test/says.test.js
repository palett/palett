import { Says } from '../src/Says'
import { deca, decoLog, logNeL } from 'xbrief'

const { logger } = require('xbrief')

export class CallableTest {
  static test () {
    const says = Says.build({ keywords: { tmr: 1 } })
    'what to do' |> says.chef
    'how would i know' |> says.worker.asc
    'i\'ll be there tmr' |> says.worker
    'anything i can do for you' |> says.tournant.asc.asc
    'no, but you just stand by' |> says.aboyeur
    'yes' |> says.tournant

    '\nregistered roster' |> logger
    says.roster |> deca({ vu: 1 }) |> logNeL
    'registered color' |> logger
    says.colorPool |> deca({ vu: 1 })|> logNeL
  }
}

CallableTest.test()
