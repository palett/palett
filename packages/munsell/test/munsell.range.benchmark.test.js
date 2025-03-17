import { test } from 'node:test'

// range(hue) {
//   const inds = this.#inds
//   for (let i = 0, min = 0, mid = 6, max = 12; i < 30; i++) {
//     if (min <= hue && hue < mid) return [ inds.at(i - 2), inds[i] ]
//     if (hue === mid) return [ inds.at(i - 2), inds[++i % 30] ]
//     if (mid < hue && hue <= max) return [ inds.at(i - 1), inds[++i % 30] ]
//     min = max, mid += 12, max += 12
//   }
// }

// original
const prim = (hue) => {
  for (let i = 0, min = 0, mid = 6, max = 12; i < 30; i++, min = max, mid += 12, max += 12) {
    if (min <= hue && hue < mid) return { [min - 24]: i - 2, [max]: i }
    if (hue === mid) return { [min - 24]: i - 2, [max + 12]: (i + 1) % 30 }
    if (mid < hue && hue <= max) return { [min - 12]: i - 1, [max + 12]: (i + 1) % 30 }
  }
}

// grk3
const snap = (hue) => {
  const k = Math.floor(hue / 12)
  const min = 12 * k
  const mid = min + 6
  const max = min + 12
  if (hue < mid) {
    return { [min - 24]: k - 2, [max]: k }
  } else if (hue === mid) {
    return { [min - 24]: k - 2, [max + 12]: (k + 1) % 30 }
  } else {
    return { [min - 12]: k - 1, [max + 12]: (k + 1) % 30 }
  }
}

// dsr1
const epos = (hue) => {
  const hueMod = hue % 360
  const step = Math.floor(hueMod / 12)
  const min = step * 12
  const mid = min + 6

  // Handle wrap-around for negative indices
  const wrap = (n) => (n + 30) % 30

  if (hueMod < mid) {
    return { [min - 24]: wrap(step - 2), [min + 12]: step, }
  }
  if (hueMod === mid) {
    return { [min - 24]: wrap(step - 2), [min + 24]: wrap(step + 1), }
  }
  return { [min - 12]: wrap(step - 1), [min + 24]: wrap(step + 1), }
}

// volcengine
const harb = (hue) => {
  const i = Math.floor(hue / 12) % 30
  const min = i * 12
  const mid = min + 6
  const max = min + 12

  if (hue < mid) return { [min - 24]: i - 2, [max]: i }
  if (hue === mid) return { [min - 24]: i - 2, [max + 12]: (i + 1) % 30 }
  return { [min - 12]: i - 1, [max + 12]: (i + 1) % 30 }
}

// Ash Rose #B5817D
// Waterfall #3AB0A2
test('munsell range benchmark', () => {
  const HUE = 216

  const TEST_PRIM = 'munsell → range - prim'
  const TEST_SNAP = 'munsell → range - snap'
  const TEST_EPOS = 'munsell → range - epos'
  const TEST_HARB = 'munsell → range - harb'


  const quant = 1e6
  console.log(TEST_PRIM, prim(HUE))
  console.log(TEST_SNAP, snap(HUE))
  console.log(TEST_EPOS, epos(HUE))
  console.log(TEST_HARB, harb(HUE))

  console.time(TEST_PRIM)
  for (let i = 0; i < quant; i++) prim(HUE)
  console.timeEnd(TEST_PRIM)

  console.time(TEST_SNAP)
  for (let i = 0; i < quant; i++) snap(HUE)
  console.timeEnd(TEST_SNAP)

  console.time(TEST_EPOS)
  for (let i = 0; i < quant; i++) epos(HUE)
  console.timeEnd(TEST_EPOS)

  console.time(TEST_HARB)
  for (let i = 0; i < quant; i++) harb(HUE)
  console.timeEnd(TEST_HARB)
})