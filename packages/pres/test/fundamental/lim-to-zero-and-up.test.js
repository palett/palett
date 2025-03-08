import { test } from 'node:test'

let x = -5

// 方法 1
const bit1 = x => x & ~(x >> 31)

// 方法 2
const bit2 = x => Math.min(x >>> 0, x)

// 方法 3
const bit3 = x => x & (x >> 31 ^ -1)

// 方法 4
const comp = x => x > 0 ? x : 0

test('lim to zero and up', () => {
  const quant = 1e8
  const value = -127

  const TEST_A = 'bit1'
  const TEST_B = 'bit2'
  const TEST_C = 'bit3'
  const TEST_D = 'comp'

  console.time(TEST_A)
  for (let i = 0; i < quant; i++) bit1(value)
  console.timeEnd(TEST_A)

  console.time(TEST_B)
  for (let i = 0; i < quant; i++) bit2(value)
  console.timeEnd(TEST_B)

  console.time(TEST_C)
  for (let i = 0; i < quant; i++) bit3(value)
  console.timeEnd(TEST_C)

  console.time(TEST_D)
  for (let i = 0; i < quant; i++) comp(value)
  console.timeEnd(TEST_D)

  console.log(bit1(value))
  console.log(bit2(value))
  console.log(bit3(value))
  console.log(comp(value))

})