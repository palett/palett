import { hexToHsi, hexToHsl, hsiToHex } from '@palett/convert'
import { dhex }                         from '@palett/dye'
import { hexToStr, hslToStr }           from '@palett/stringify'
import { mapEntry }                     from '@vect/object-mapper'
import { test }    from 'node:test'
import { UBITONE } from '../resources/UBITONE.js'
import { Munsell } from '../src/Munsell.js'
import { deltaHsi }                     from '../src/utils/color-utils.js'


export class MunPrev {
  static #MAX = 0x400
  static #raw

  static get dict() {
    return MunPrev.#raw ?? (MunPrev.#raw = mapEntry(UBITONE, hex => [ hex, hexToHsi(hex) ]))
  }
  static nearest(hsi) {
    let min = MunPrev.#MAX, curr, next, delta
    const dict = MunPrev.dict
    for (let hex in dict) {
      if ((delta = deltaHsi(hsi, (curr = dict[hex]))) < min) { min = delta, next = curr }
    }
    return min === MunPrev.#MAX ? null : next
  }
}

export class MunEpic {
  static #MAX = 0x400
  static #raw

  static get dict() {
    return MunEpic.#raw ?? (MunEpic.#raw = mapEntry(UBITONE, hex => [ hexToHsi(hex), hex ]))
  }
  static name(hsi) { return UBITONE[MunEpic.#raw[hsi]]}
  static hsiToHex(hsi) { return MunEpic.dict[hsi] }
  static nearest(hsi) {
    let min = MunEpic.#MAX, next, delta, curr
    for (let curr in MunEpic.dict) {
      if ((delta = deltaHsi(hsi, curr)) < min) { min = delta, next = curr }
    }
    return min === MunEpic.#MAX ? null : next
  }
}

export class MunEdge {
  static #MAX = 0x400
  static #list

  static get list() {
    return MunEdge.#list ?? (MunEdge.#list = Object.keys(UBITONE).map(hexToHsi))
  }
  static nearest(hsi) {
    let min = MunEdge.#MAX, next, delta, curr
    const list = MunEdge.list, hi = list.length
    for (let i = 0; i < hi; i++) {
      if ((delta = deltaHsi(hsi, (curr = list[i]))) < min) { min = delta, next = curr }
    }
    return min === MunEdge.#MAX ? null : next
  }
}

test('hInterval', () => {
  const candidates = {
    '#CA3422': 'Poinciana',
    '#B5817D': 'Ash Rose',
    '#3AB0A2': 'Waterfall',
    '#AAAAC4': 'Cosmic Sky',
    '#ECB2B3': 'Powder Pink',
    '#D75C5D': 'Spiced Coral'
  }
  for (let hex in candidates) {
    const hsi = hexToHsi(hex)
    const h = (hsi >> 16 & 0x1FF)
    console.log(hexToStr(hex), hslToStr(hexToHsl(hex)), dhex.call(hex, candidates[hex]))
    Munsell.list
    console.log(Munsell.adjacent(h))
  }
})

// Ash Rose #B5817D
// Waterfall #3AB0A2
test('flopper benchmark', () => {
  const hex = '#3AB0A2'
  const hsi = hexToHsi(hex)
  const name = 'Waterfall'
  console.log(name, hexToStr(hex))
  const TEST_PREV = 'hex → randPres - prev'
  const TEST_EPIC = 'hex → randPres - epic'
  const TEST_EDGE = 'hex → randPres - edge'
  const TEST_NEXT = 'hex → randPres - next'


  const quant = 1e4
  console.log(TEST_PREV, MunPrev.nearest(hsi), hexToStr(hsiToHex(MunEpic.nearest(hsi))))
  console.log(TEST_EPIC, MunEpic.nearest(hsi), hexToStr(hsiToHex(MunEpic.nearest(hsi))))
  console.log(TEST_EDGE, MunEdge.nearest(hsi), hexToStr(hsiToHex(MunEdge.nearest(hsi))))
  console.log(TEST_NEXT, Munsell.nearest(hsi), hexToStr(hsiToHex(Munsell.nearest(hsi))))

  console.time(TEST_PREV)
  for (let i = 0; i < quant; i++) MunPrev.nearest(hsi)
  console.timeEnd(TEST_PREV)

  console.time(TEST_EPIC)
  for (let i = 0; i < quant; i++) MunEpic.nearest(hsi)
  console.timeEnd(TEST_EPIC)

  console.time(TEST_EDGE)
  for (let i = 0; i < quant; i++) MunEdge.nearest(hsi)
  console.timeEnd(TEST_EDGE)

  console.time(TEST_NEXT)
  for (let i = 0; i < quant; i++) Munsell.nearest(hsi)
  console.timeEnd(TEST_NEXT)
})