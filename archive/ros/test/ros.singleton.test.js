import { rand }                    from '@aryth/rand'
import { VectorCollection }        from '@foba/vector-string'
import { BOLD, ITALIC, UNDERLINE } from 'constants/enum-font-effects'
import { delogger }                from '@spare/deco'
import { Ros }                     from '../src/Ros'

export const test = () => {
  /** @type {Function} */  const ros = Ros.build([BOLD, ITALIC, UNDERLINE])
  const vec = VectorCollection.flopShuffle({ size: 10 })
  for (let word of vec) {
    ros(word + ':' + rand(1000)) |> delogger
  }
}

test()
