import { OBJ }  from '@typen/enum-data-types'
import { test } from 'node:test'
import { Pres } from '../src/Pres.js'

export const typecheck_epic = x => {
  return x instanceof Pres // && (!(x instanceof Presm))
}

export const typecheck_edge = x => {
  return typeof x === OBJ // && typeof x !== STR
}

export const typecheck_next = x => {
  if (!x) return false
  return !!(x.max && x.min && x.nan)
}


test('flopper benchmark', () => {
  const pres = new Pres()

  const TEST_EPIC = 'epic'
  const TEST_EDGE = 'edge'
  const TEST_NEXT = 'next'

  const quant = 1e8
  console.log(TEST_EPIC, typecheck_epic(pres))
  console.log(TEST_EDGE, typecheck_edge(pres))
  console.log(TEST_NEXT, typecheck_next(pres))

  console.time(TEST_EPIC)
  for (let i = 0; i < quant; i++) typecheck_epic(pres)
  console.timeEnd(TEST_EPIC)

  console.time(TEST_EDGE)
  for (let i = 0; i < quant; i++) typecheck_edge(pres)
  console.timeEnd(TEST_EDGE)

  console.time(TEST_NEXT)
  for (let i = 0; i < quant; i++) typecheck_next(pres)
  console.timeEnd(TEST_NEXT)

})