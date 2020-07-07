import { flopEntry, rand }           from '@aryth/rand'
import { ObjectCollection }          from '@foba/object-string'
import { makeReplaceable }           from '@glossa/translator'
import { AQUA, LAVA, OCEAN, SUBTLE } from '@palett/presets'
import { RN }                        from '@spare/enum-chars'
import { DecoVector }                from '@spare/logger'
import { says }                      from '../index'

const dict = [
  [/\. /g, '.' + RN],
  [/! /g, '!' + RN],
  [/: /g, ':' + RN],
] |> makeReplaceable

const presets = [AQUA, OCEAN, LAVA, SUBTLE]
for (let i = 0, film, quote; i < 24; i++) {
  [film, quote] = ObjectCollection.MovieQuotes |> flopEntry
  quote = quote.replace(dict, x => x.split(' '))
    |> DecoVector({ indexed: false, delim: ' ', stringPreset: SUBTLE })
  const sayer = rand(2)
    ? (rand(2) ? says[film] : says[film].asc)
    : (rand(2) ? says[film] : says[film].desc)
  quote |> sayer.br(i)
}

