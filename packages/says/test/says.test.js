import { Says } from '../src/Says'
import { deca } from '@spare/deco'
import { decoMatrix, DecoVector, delogger, logger, logNeL } from '@spare/logger'
import { movieQuotesEntries } from './movie.lines'
import { flop, rand } from '@aryth/rand'
import { SimpleMatrices } from '@foba/foo'
import { AQUA, AURORA, FRESH, JUNGLE, LAVA, METRO, OCEAN, PLANET, Presets, SUBTLE } from '@palett/presets'
import { xr } from '@spare/xr'
import { RN } from '@spare/util'
import { BOLD } from '@palett/enum-font-effects'
import { says } from '../index'

export class CallableTest {
  static test () {
    const says = Says.build({ effects: [BOLD] })
    'what to do' |> says.chef
    'how would i know' |> says.worker.asc
    'i\'ll be there tmr' |> says.worker
    'anything i can do for you' |> says.tournant.asc.asc
    'no,\n but you just stand by, \nand wait for order' |> says.aboyeur
    'yes' |> says.tournant

    '\nregistered roster' |> logger
    says.roster |> deca({ vo: 1 }) |> logNeL
    'registered color' |> logger
    says.colorPool |> deca({ vo: 1 })|> logNeL
    says.roster() |> delogger
  }

  static test2 () {
    const presets = [AQUA, OCEAN, LAVA, SUBTLE]
    for (let i = 0, film, quote; i < 24; i++) {
      [film, quote] = movieQuotesEntries |> flop
      quote = quote
        .replace(/\. /g, '.' + RN)
        .replace(/! /g, '!' + RN)
        .replace(/: /g, ':' + RN)
        .split(' ') |> DecoVector({ indexed: false, delimiter: ' ', stringPreset: SUBTLE })
      const sayer = rand(2)
        ? (rand(2) ? says[film] : says[film].asc)
        : (rand(2) ? says[film] : says[film].desc)
      quote |> sayer
    }
    for (const [key, matrix] of Object.entries(SimpleMatrices)) {
      matrix |> decoMatrix |> says[key]
    }
    const stb = function (y) {
      xr()['y % 4'](y % 4)['y % 100'](y % 4)['y % 400'](y % 400)['result'](!(y % 4) && (y % 100) || !(y % 400)) |>  says[y]
      return !(y % 4) && (y % 100) || !(y % 400)
    }
    stb(1024) |> says[1024]
    says.roster(1024) |> delogger
  }
}

CallableTest.test2()
