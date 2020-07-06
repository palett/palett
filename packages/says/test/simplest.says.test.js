import { decoString } from '@spare/logger'
import { says }       from '../index'

const test = () => {
  'now is the winter of our discontent, made glorious by the sun of York' |> decoString |> says['Richard II']
  'released soon' |> decoString |> says[2077]
  'dyed' |> says[decoString('cyberPunk2077')]
}

test()