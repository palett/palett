import { test } from 'node:test'

// deepseek v3
function iter_prim(vec, lo, hi, proc) {
  // Handle negative indices and indices exceeding vec.length using vec.at()
  const length = vec.length

  // Normalize lo and hi to ensure they are within the vec bounds
  lo = ((lo % length) + length) % length // Handles negative and out-of-bounds lo
  hi = ((hi % length) + length) % length // Handles negative and out-of-bounds hi

  // Determine the direction of traversal
  if (lo <= hi) {
    // Traverse from lo to hi
    for (let i = lo; i <= hi; i++) {
      proc(vec.at(i), i)
    }
  } else {
    // Traverse from lo to the end of the vec, then from the start to hi
    for (let i = lo; i < length; i++) {
      proc(vec.at(i), i)
    }
    for (let i = 0; i <= hi; i++) {
      proc(vec.at(i), i)
    }
  }
}

// deepseek r1
function iter_camp(vec, lo, hi, proc) {
  const len = vec.length
  if (len === 0) return

  // 计算循环边界（支持负数和大数）
  function clamp(n) { return ((n % len) + len) % len }
  const start = clamp(lo)
  const end = clamp(hi)

  // 正向遍历逻辑
  if (start <= end) {
    for (let i = start; i <= end; i++) {
      proc(vec.at(i), i, vec)
    }
  }
  // 循环遍历逻辑（跨越数组末尾）
  else {
    for (let i = start; i < len; i++) {
      proc(vec.at(i), i, vec)
    }
    for (let i = 0; i <= end; i++) {
      proc(vec.at(i), i, vec)
    }
  }
}

// xaylam
function iter_edge(vec, lo, hi, proc) {
  const len = vec.length
  if (lo < hi) {
    if (lo < 0) { // [-30, 30]
      for (let i = lo + len; i < len; i++) proc(vec[i], i)
      for (let i = 0; i < hi; i++) proc(vec[i], i)
      return void 0
    }
    if (hi > len) { // [330, 390]
      for (let i = lo; i < len; i++) proc(vec[i], i)
      for (let i = 0; i < hi - len; i++) proc(vec[i], i)
      return void 0
    }
    { // [120, 180]
      for (let i = lo; i < hi; i++) proc(vec[i], i)
      return void 0
    }
  } else { // [330, 30]
    for (let i = lo; i < len; i++) proc(vec[i], i)
    for (let i = 0; i < hi; i++) proc(vec[i], i)
  }
}

// grok3
/**
 * Iterates over array elements from min index to max index, with support for
 * negative indices and circular traversal using array.at()
 *
 * @param {Array} vec - The array to iterate over
 * @param {number} lo - The starting index (can be negative)
 * @param {number} hi - The ending index (can exceed array length)
 * @param {Function} action - Callback function to execute on each element (receives value, index, array)
 */
function iter_nexo(vec, lo, hi, action) {
  const len = vec.length
  if (hi < lo) {hi += len}
  for (let i = lo; i <= hi; i++) {
    const index = i % len // Circular traversal
    const element = vec.at(index)
    action(element, index, vec)
  }
}

test('circular traversal benchmark', () => {
  const candidates = [
    'Cerulean',        // 2000 | #9BB7D4
    'Fuchsia Rose',    // 2001 | #C74375
    'True Red',        // 2002 | #BF1932
    'Aqua Sky',        // 2003 | #7BC4C4
    'Tigerlily',       // 2004 | #E2583E
    'Blue Turquoise',  // 2005 | #53B0AE
    'Sand Dollar',     // 2006 | #DECDBE
    'Chili Pepper',    // 2007 | #9B1B30
    'Blue Iris',       // 2008 | #5A5B9F
    'Mimosa',          // 2009 | #F0C05A
    'Turquoise',       // 2010 | #45B5AA
    'Honeysuckle',     // 2011 | #D94F70
    'Tangerine Tango', // 2012 | #DD4124
    'Emerald',         // 2013 | #009473
    'Radiant Orchid',  // 2014 | #AD5E99
    'Marsala',         // 2015 | #964F4C
    'Rose Quartz',     // 2016 | #F7CAC9
    'Greenery',        // 2017 | #88B04B
    'Ultra Violet',    // 2018 | #5F4B8B
    'Living Coral',    // 2019 | #FF6F61
    'Classic Blue',    // 2020 | #0F4C81
    'Illuminating',    // 2021 | #F5DF4D
    'Very Peri',       // 2022 | #6667AB
    'Viva Magenta',    // 2023 | #BB2649
    'Peach Fuzz',      // 2024 | #FFBE98
    'Mocha Mousse',     // 2025 | #A47864
  ]

  const TEST_PRIM = 'vec → circular traversal - prim'
  const TEST_CAMP = 'vec → circular traversal - camp'
  const TEST_EDGE = 'vec → circular traversal - edge'
  const TEST_NEXO = 'vec → circular traversal - nexo'

  const lo = -3, hi = 3
  const quant = 1e8
  console.log(TEST_PRIM)
  iter_prim(candidates, lo, hi, ((x, i) => console.log(i, x)))
  console.log(TEST_CAMP)
  iter_camp(candidates, lo, hi, ((x, i) => console.log(i, x)))
  console.log(TEST_EDGE)
  iter_edge(candidates, lo, hi, ((x, i) => console.log(i, x)))
  console.log(TEST_NEXO)
  iter_nexo(candidates, lo, hi, ((x, i) => console.log(i, x)))

  console.time(TEST_PRIM)
  for (let i = 0; i < quant; i++) iter_prim(candidates, lo, hi, () => {})
  console.timeEnd(TEST_PRIM)

  console.time(TEST_CAMP)
  for (let i = 0; i < quant; i++) iter_camp(candidates, lo, hi, () => {})
  console.timeEnd(TEST_CAMP)

  console.time(TEST_EDGE)
  for (let i = 0; i < quant; i++) iter_edge(candidates, lo, hi, () => {})
  console.timeEnd(TEST_EDGE)

  console.time(TEST_NEXO)
  for (let i = 0; i < quant; i++) iter_nexo(candidates, lo, hi, () => {})
  console.timeEnd(TEST_NEXO)
})