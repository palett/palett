import { distance } from '@aryth/polar'
import { hexToHsi } from '@palett/convert'
import { MIDTONE }  from '../resources/MIDTONE.js'
import { deltaHsi } from './utils/color-utils.js'
import { circ }     from './utils/iter-utils.js'

//  0: [  0, 12] //  [   0,  197]
//  1: ( 12, 24] //  ( 198,  416]
//  2: ( 24, 36] //  ( 417,  682]
//  3: ( 36, 48] //  ( 683,  877]
//  4: ( 48, 60] //  ( 878,  965]
//  5: ( 60, 72] //  ( 966, 1018]
//  6: ( 72, 84] //  (1019, 1055]
//  7: ( 84, 96] //  (1056, 1094]
//  8: ( 96,108] //  (1095, 1121]
//  9: (108,120] //  (1122, 1147]
// 10: (120,132] //  (1148, 1170]
// 11: (132,144] //  (1171, 1198]
// 12: (144,156] //  (1199, 1237]
// 13: (156,168] //  (1238, 1302]
// 14: (168,180] //  (1303, 1396]
// 15: (180,192] //  (1397, 1482]
// 16: (192,204] //  (1483, 1578]
// 17: (204,216] //  (1579, 1670]
// 18: (216,228] //  (1671, 1750]
// 19: (228,240] //  (1751, 1792]
// 20: (240,252] //  (1793, 1814]
// 21: (252,264] //  (1815, 1849]
// 22: (264,276] //  (1850, 1882]
// 23: (276,288] //  (1883, 1918]
// 24: (288,300] //  (1919, 1941]
// 25: (300,312] //  (1942, 1968]
// 26: (312,324] //  (1969, 2019]
// 27: (324,336] //  (2020, 2078]
// 28: (336,348] //  (2079, 2196]
// 29: (348,360] //  (2197, 2314]

export class MunsellEpic {
  static #MAX = 0x400
  static #ds = 24
  static #dl = 24
  static #inds = Array(30)
  static #rev
  static #list
  static get list() {
    return MunsellEpic.#list ?? MunsellEpic.#init()
  }
  static #init() {
    const entries = Object.entries(MIDTONE)
    const hi = entries.length, list = Array(hi), rev = {}
    MunsellEpic.#list = list, MunsellEpic.#rev = rev
    let hueInt = 6, t = 0
    for (let i = 0, hsi; i < hi; i++) {
      const [ hex, name ] = entries[i]
      hsi = list[i] = hexToHsi(hex)
      rev[hsi] = hex + ' ' + name
    }
    list.sort((a, b) => a - b)
    for (let i = 0; i < hi; i++) { // console.log(hexToStr(hsiToHex(hsi)), hsi >> 16 & 0x1FF, distance(hsi >> 16 & 0x1FF, 15))
      if (distance((list[i]) >> 16 & 0x1FF, hueInt) > 6) { MunsellEpic.#inds[t++] = i, hueInt += 12 }
    }
    MunsellEpic.#inds[t] = hi
    return MunsellEpic.#list
  }
  static entry(hsi) {
    if (!MunsellEpic.#list) MunsellEpic.#init()
    const entry = MunsellEpic.#rev[hsi]
    return entry ? [ entry.slice(0, 7), entry.slice(8) ] : null
  }

  static adjacent(hue) {
    if (!MunsellEpic.#list) MunsellEpic.#init()
    const inds = MunsellEpic.#inds
    for (let i = 0, min = 0, mid = 6, max = 12; i < 30; i++) {
      if (min <= hue && hue < mid) return [ inds.at(i - 2), inds.at(i) ]
      if (hue === mid) return [ inds.at(i - 2), inds.at(++i > 30 ? i - 30 : i) ]
      if (mid < hue && hue <= max) return [ inds.at(i - 1), inds.at(++i > 30 ? i - 30 : i) ]
      min = max, mid += 12, max += 12
    }
  }

  static nearest(hsi) {
    const h = hsi >> 16 & 0x1FF, s = hsi >> 8 & 0xFF, l = hsi & 0xFF
    const sb = s - MunsellEpic.#ds, sp = s + MunsellEpic.#ds
    const lb = l - MunsellEpic.#dl, lp = l + MunsellEpic.#dl
    let [ ib, ip ] = MunsellEpic.adjacent(h) // console.log(ib, ip)
    let min = MunsellEpic.#MAX, next, delta
    circ.call(MunsellEpic.list, ib, ip, (cur) => {
      const sc = cur >> 8 & 0xFF, lc = cur & 0xFF
      if ((sb <= sc && sc <= sp) && (lb <= lc && lc <= lp)) {
        if ((delta = deltaHsi(hsi, cur)) < min) { min = delta, next = cur }
      }
    }) // console.log(hslToStr(hsiToHsl(hsi)), hslToStr(hsiToHsl(next)), deltaHsi(hsi, next), min)
    return min === MunsellEpic.#MAX ? null : next
  }

  static nearestHex(hsi) {
    hsi = MunsellEpic.nearest(hsi)
    const entry = MunsellEpic.#rev[hsi]
    return entry ? entry.slice(0, 7) : null
  }

  static nearestEntry(hsi) {
    hsi = MunsellEpic.nearest(hsi)
    return MunsellEpic.entry(hsi)
  }
}