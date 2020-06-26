import { BOLD }           from '@palett/enum-font-effects'
import { deca }           from '@spare/deco'
import { logger, logNeL } from '@spare/logger'
import { Says }           from '../src/Says'

const says = Says.build({ effects: [BOLD] })
'what to do' |> says.chef.to(says.worker)
'how would i know' |> says.worker.asc
'i\'ll be there tmr' |> says.worker
'anything i can do for you' |> says.tournant.asc.asc
'no,\n but you just stand by, \nand wait for order' |> says.aboyeur
'yes' |> says.tournant

'\nregistered roster' |> logger
says.roster() |> deca({ vo: 1 }) |> logNeL
