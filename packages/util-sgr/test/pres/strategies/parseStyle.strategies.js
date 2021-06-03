import { combinator }                                 from '@aryth/subset'
import { makeEmbedded }                               from '@foba/util'
import { decoCrostab, says }                          from '@spare/logger'
import { strategies }                                 from '@valjoux/strategies'
import { iso }                                        from '@vect/object'
import { BLINK, BOLD, INVERSE, INVISIBLE, UNDERLINE } from '../lib/styles'


const effects = [ BOLD, UNDERLINE, BLINK, INVERSE, INVISIBLE ]
const candidates = {}
for (let list of combinator(effects, 1)) candidates[list.join('_')] = iso(list, true)
for (let list of combinator(effects, 2)) candidates[list.join('_')] = iso(list, true)
for (let list of combinator(effects, 3)) candidates[list.join('_')] = iso(list, true)
for (let list of combinator(effects, 4)) candidates[list.join('_')] = iso(list, true)
for (let list of combinator(effects, 5)) candidates[list.join('_')] = iso(list, true)

const { lapse, result } = strategies({
  repeat: 1E+5,
  candidates: candidates |> makeEmbedded,
  methods: {
    bench: x => x,
    cla(style) {
      let { bold, underline, blink, inverse, invisible } = style
      return (
        ((invisible ? 16 : 0) << 18) |
        ((inverse ? 8 : 0) << 18) |
        ((blink ? 4 : 0) << 18) |
        ((underline ? 2 : 0) << 18) |
        ((bold ? 1 : 0) << 18)
      )
    },
    dev(style) {
      const { bold, underline, blink, inverse, invisible } = style
      return (
        (invisible ? 16 : 0) |
        (inverse ? 8 : 0) |
        (blink ? 4 : 0) |
        (underline ? 2 : 0) |
        (bold ? 1 : 0)
      ) << 18
    },
    edg(style) {
      const { bold, underline, blink, inverse, invisible } = style
      return (
        (invisible ? 16 : 0) |
        (inverse ? 8 : 0) |
        (blink ? 4 : 0) |
        (underline ? 2 : 0) |
        (bold ? 1 : 0)
      )
    },
  }
})

lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']