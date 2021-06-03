import { combinator }                                 from '@aryth/subset'
import { makeReplaceable }                            from '@glossa/translator'
import { logger, ros, xr }                            from '@spare/logger'
import { iso }                                        from '@vect/object'
import { BLINK, BOLD, INVERSE, INVISIBLE, UNDERLINE } from '../lib/styles'
import { parseStyle }                                 from '../lib/toStyle'

const EFFECTS = [ BOLD, UNDERLINE, BLINK, INVERSE, INVISIBLE ]
const candidates = {}
for (let list of combinator(EFFECTS, 1)) candidates[list.join(' ')] = iso(list, true)
for (let list of combinator(EFFECTS, 2)) candidates[list.join(' ')] = iso(list, true)
for (let list of combinator(EFFECTS, 3)) candidates[list.join(' ')] = iso(list, true)
for (let list of combinator(EFFECTS, 4)) candidates[list.join(' ')] = iso(list, true)
for (let list of combinator(EFFECTS, 5)) candidates[list.join(' ')] = iso(list, true)

const effectDictionary = EFFECTS.map(t => ([ t, ros(t) ])) |> makeReplaceable

const result = Object
  .entries(candidates)
  .map(([ key, value ]) => [ key.replace(effectDictionary), parseStyle(value) ])
  .sort(([ , v_ ], [ , _v ]) => v_ - _v)

for (const [ key, value ] of result) {
  xr()
    [String(value).padStart(2)](value.toString(2).padStart(5))
    .br(key) |> logger
}