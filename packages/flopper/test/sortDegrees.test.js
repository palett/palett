import { NUM_DESC }       from '@aryth/rank'
import { delogger }       from '@spare/logger'
import { degreeToIndice } from '../src/utils/degreeToIndice.js'
import { sortBy }         from '../src/utils/sortDegrees.js'

export const sortDegreesTest = () => {
  const degrees = [
    'accent_4',
    'accent_3',
    'accent_2',
    'accent_1',
    'lighten_5',
    'lighten_4',
    'lighten_3',
    'lighten_2',
    'lighten_1',
    'base',
    'darken_1',
    'darken_2',
    'darken_3',
    'darken_4',
  ]
  sortBy.call(degrees, degreeToIndice, NUM_DESC) |> delogger
}

sortDegreesTest()
