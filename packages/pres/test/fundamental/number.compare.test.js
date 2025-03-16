import { NUM }  from '@typen/enum-data-types'
import { test } from 'node:test'

const candidates = [
  undefined,
  null,
  true,
  false,
  [],
  'a',
  '0',
  -1,
  0,
  1,
  511 << 16 | 255 << 8 | 255,
  (511 << 16 | 255 << 8 | 255) + 1,
  NaN,
  Infinity,
]

const CAMP = 'camp'
const FUSE = 'fuse'
const ARCH = 'arch'
const EPIC = 'epic'
const VOLT = 'volt'

const camp = n => typeof n === NUM
const fuse = n => n >= 0 && n < 0x2000000
const arch = n => !isNaN(n - parseFloat(n))
const epic = n => !isNaN(n)
const volt = x => (x = +x) || (x === 0)

test('number compare', () => {
  for (let n of candidates) {
    const flag = n >= 0 && n < 0x2000000
    // if (flag) {
    //   console.log(n, flag, 'h', (n >> 16), 's', (n >> 8), 'l', n >> 0)
    // } else {
    //   console.log(n, flag, 'not applicable')
    // }
    console.log(String(n).padStart(8), CAMP, camp(n), FUSE, fuse(n), ARCH, arch(n), EPIC, epic(n))
  }
})

test('pres compare', () => {
  const value = 127

  const quant = 1e8
  console.log(CAMP, camp(value))
  console.log(FUSE, fuse(value))
  console.log(ARCH, arch(value))
  console.log(EPIC, epic(value))
  console.log(VOLT, volt(value))

  console.time(CAMP)
  for (let i = 0; i < quant; i++) epic(value)
  console.timeEnd(CAMP)

  console.time(FUSE)
  for (let i = 0; i < quant; i++) fuse(value)
  console.timeEnd(FUSE)

  console.time(ARCH)
  for (let i = 0; i < quant; i++) arch(value)
  console.timeEnd(ARCH)

  console.time(EPIC)
  for (let i = 0; i < quant; i++) epic(value)
  console.timeEnd(EPIC)

  console.time(VOLT)
  for (let i = 0; i < quant; i++) volt(value)
  console.timeEnd(VOLT)

})