import { Palett }       from 'palett'
import { deca, logNeL } from 'xbrief'
import { says }         from '../../../index'
import { alpha }        from './alpha'
import { beta }         from './beta'
import { gamma }        from './gamma'

const logger = { alpha, beta, gamma }

'Mount Kilimanjaro' |> logger.alpha
'Batian on Mount Kenya' |> logger.beta
'Margherita Peak on Mount Stanley' |> logger.gamma

logger.theta = says.aboard('theta', Palett.red.base)
'another' |> logger.theta

says.roster |> deca({ uv: 1 }) |> logNeL




