import { hexToInt, hexToRgb } from '@palett/convert'
import { test }               from 'node:test'


function intIn_intOut(int) {
  let r = int >> 16 & 0xFF, g = int >> 8 & 0xFF, b = int & 0xFF
  r++, g++, b++
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}

function intIn_vecOut(int) {
  let r = int >> 16 & 0xFF, g = int >> 8 & 0xFF, b = int & 0xFF
  r++, g++, b++
  return [ r, g, b ]
}

function vecIn_intOut(rgb) {
  let r = rgb[0], g = rgb[1], b = rgb[2]
  r++, g++, b++
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}

function vecIn_vecOut(rgb) {
  let r = rgb[0], g = rgb[1], b = rgb[2]
  r++, g++, b++
  return [ r, g, b ]
}


test('value storage', () => {
  const hex = '#22F0CC'
  const rgb = hexToRgb(hex)
  const int = hexToInt(hex)

  const TEST_A = 'Int In → Int Out'
  const TEST_B = 'Int In → Vec Out'
  const TEST_C = 'Vec In → Int Out'
  const TEST_D = 'Vec In → Vec Out'

  const quant = 1e8
  console.time(TEST_A)
  for (let i = 0; i < quant; i++) intIn_intOut(int)
  console.timeEnd(TEST_A)

  console.time(TEST_B)
  for (let i = 0; i < quant; i++) intIn_vecOut(int)
  console.timeEnd(TEST_B)

  console.time(TEST_C)
  for (let i = 0; i < quant; i++) vecIn_intOut(rgb)
  console.timeEnd(TEST_C)

  console.time(TEST_D)
  for (let i = 0; i < quant; i++) vecIn_vecOut(rgb)
  console.timeEnd(TEST_D)
})