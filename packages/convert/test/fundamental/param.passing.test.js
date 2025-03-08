import { test } from 'node:test'

function sumDirect(a, b, c) {
  return a + b + c
}

function sumSpread(...args) {
  return args[0] + args[1] + args[2]
}

function sumArray(arr) {
  return arr[0] + arr[1] + arr[2]
}

test('param passing', () => {
  const args = [ 1, 2, 3 ]

  const quant = 1e8
  console.time('Direct')
  for (let i = 0; i < quant; i++) {
    sumDirect(1, 2, 3)
  }
  console.timeEnd('Direct')

  console.time('Spread')
  for (let i = 0; i < quant; i++) {
    sumSpread(...args)
  }
  console.timeEnd('Spread')

  console.time('Array')
  for (let i = 0; i < quant; i++) {
    sumArray(args)
  }
  console.timeEnd('Array')
})