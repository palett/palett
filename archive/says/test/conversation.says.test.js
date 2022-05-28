import { BOLD }           from '@palett/enum-font-effects'
import { Deco }           from '@spare/deco'
import { LF }             from '@spare/enum-chars'
import { logger, logNeL } from '@spare/logger'
import { Says }           from '../src/Says'

const says = Says.build({ effects: [BOLD] })

'what to do' |> says.chef.to(says.aboyeur).to(says.worker)
'how would i know' |> says.worker.asc.to(says.chef)
'i\'ll be there tmr' |> says.worker
'anything i can do for you' |> says.tournant.asc.asc
'no,\n but you just stand by, \nand wait for order' |> says.aboyeur
'yes' |> says.tournant

LF + 'registered roster' |> logger
says.roster() |> Deco({ vo: 1 }) |> logNeL
