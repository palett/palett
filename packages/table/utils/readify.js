import { camelToSnake }    from '@spare/phrasing'
import { makeReplaceable } from '@spare/translator'

const lexicon = [
  [/light/gi, 'l'],
  [/deep/gi, 'd']
] |> makeReplaceable

export const readify = name => name.replace(lexicon, x => camelToSnake(x, '.'))
