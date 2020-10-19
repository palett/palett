import { VectorCollection } from '@foba/vector-string'
import { delogger }         from '@spare/deco'
import { ros }              from '../index'

export const test = () => {
  const vec = VectorCollection.flopShuffle({ size: 10 })
  for (let word of vec) {
    ros(word) |> delogger
  }
}

test()