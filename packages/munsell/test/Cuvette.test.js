import { says } from '@spare/logger'
import { time } from '@valjoux/timestamp-pretty'
import { test } from 'node:test'
import { Cova } from '../archive/Cova.js'

says['log-time'].attach(time)
says['cuvette'].asc.asc

test('cuvette test', () => {
  // Transform pipeline operator to nested function calls
  says['log-time']('preparing')
  const cuvette = Cova

  says['log-time']('generating entries')
  says['cuvette'].p('entries.length', cuvette.entries.length)
  says['log-time']('generating entries')
  says['cuvette'].p('entries.length', cuvette.entries.length)

  says['log-time']('generating hexToRgb')
  says['cuvette'].p('entries.length', cuvette.hexToRgb.length)
  says['log-time']('generating hexToRgb')
  says['cuvette'].p('entries.length', cuvette.hexToRgb.length)

  says['log-time']('generating hexToHsl')
  says['cuvette'].p('entries.length', cuvette.hexToHsl.length)
  says['log-time']('generating hexToHsl')
  says['cuvette'].p('entries.length', cuvette.hexToHsl.length)

  says['log-time']('generating hexToPolar')
  says['cuvette'].p('entries.length', cuvette.hexToPolar.length)
  says['log-time']('generating hexToPolar')
  says['cuvette'].p('entries.length', cuvette.hexToPolar.length)
})
