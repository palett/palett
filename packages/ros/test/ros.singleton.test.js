import { VectorCollection } from '@foba/vector-string'
import { delogger }         from '@spare/deco'
import { Ros }              from '../src/Ros'

export const test = () => {
  /** @type {Function} */  const ros = Ros.build()
  const vec = VectorCollection.flopShuffle({ size: 10 })
  for (let word of vec) {
    ros(word) |> delogger
  }
}

test()