import { mutate } from '@vect/vector-mapper'

export const sortBy = function (indicator, comparer) {
  const
    vec = this,
    kvs = mutate(vec, (x, i) => [ indicator(x, i), x ])
      .sort(toKeyComparer(comparer))
  return mutate(kvs, ([ , value ]) => value)
}

const toKeyComparer = comparer => (a, b) => comparer(a[0], b[0])

// accent  15 -3
// base    14 - 16
// lighten 14 -3
// darken  13 -3
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




