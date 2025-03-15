import { test } from 'node:test'

const list = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
]

test('bitwise add', () => {
  for (let n of list) {
    console.log(n, n >> 1, n >> 2, n >> 3)
  }
})