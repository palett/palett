import { DecoVector } from '@spare/logger'
import { movieQuotesEntries } from './assets/movie.lines'
import { flop, rand } from '@aryth/rand'
import { AQUA, LAVA, OCEAN, SUBTLE } from '@palett/presets'
import { RN } from '@spare/enum-chars'
import { says } from '../index'
import { makeReplaceable } from '@glossa/translator'

const dict = [
  [/\. /g, '.' + RN],
  [/! /g, '!' + RN],
  [/: /g, ':' + RN],
] |> makeReplaceable

const presets = [AQUA, OCEAN, LAVA, SUBTLE]
for (let i = 0, film, quote; i < 24; i++) {
  [film, quote] = movieQuotesEntries |> flop
  quote = quote.replace(dict, x => x.split(' '))
    |> DecoVector({ indexed: false, delimiter: ' ', stringPreset: SUBTLE })
  const sayer = rand(2)
    ? (rand(2) ? says[film] : says[film].asc)
    : (rand(2) ? says[film] : says[film].desc)
  quote |> sayer.br(i)
}

