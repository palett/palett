import { test } from 'node:test'

const alpha = (tt, df) => df / (255 - Math.abs(tt - 255))

const beta = (tt, df) => df / (tt > 255 ? (510 - tt) : tt)

test('saturation calc', () => {
  console.time('alpha')
  for (let i = 0; i < 1e7; i++) {
    alpha(510, 255) // Example input
  }
  console.timeEnd('alpha')

  console.time('beta')
  for (let i = 0; i < 1e7; i++) {
    beta(510, 255) // Example input
  }
  console.timeEnd('beta')
})