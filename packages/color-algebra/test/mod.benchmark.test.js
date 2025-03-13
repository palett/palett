import { test } from 'node:test'

const camp = x => {
  while (x >= 360) { x -= 360 }
  while (x <= 0) { x += 360 }
  return x
}

const fuse = x => {
  return x % 360
}

const velo = x => {
  return (x %= 360) < 0 ? x + 360 : x
}

test('mod benchmark', () => {
  // const val = 0o200000000000000000
  const val = -361

  const CAMP = 'number → mod - camp'
  const FUSE = 'number → mod - fuse'
  const VELO = 'number → mod - velo'
  const NEXO = 'number → mod - nexo'

  const quant = 1e6
  console.log(CAMP, camp(val))
  console.log(FUSE, fuse(val))
  console.log(VELO, velo(val))
  // console.log(NEXO,  nexo(vec))

  let result

  console.time(CAMP)
  for (let i = 0; i < quant; i++) camp(val)
  console.timeEnd(CAMP)

  console.time(FUSE)
  for (let i = 0; i < quant; i++) fuse(val)
  console.timeEnd(FUSE)

  console.time(VELO)
  for (let i = 0; i < quant; i++) velo(val)
  console.timeEnd(VELO)
  //
  // console.time(NEXO)
  // for (let i = 0; i < quant; i++) nexo(val)
  // console.timeEnd(NEXO)


})