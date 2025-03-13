import { hexToHsl }           from '@palett/convert'
import { hexToStr, hslToStr } from '@palett/stringify'
import { test }     from 'node:test'
import { narrowSL } from '../archive/utils/color-utils.js'

const candidates = [
  '#625D5D', '#BEBDBD', '#6E4C4B', '#A99592', '#AE9490', '#BBA5A0',
  '#7B6660', '#876155', '#847A75', '#827E7C', '#8E7C71', '#D7CBC4',
  '#A89A91', '#937B6A', '#958B84', '#A89C94', '#685C53', '#816D5E',
  '#CABEB5', '#B19D8D', '#8D7E71', '#6E5C4B', '#9F8D7C', '#B49F89',
  '#B3ADA7', '#8D8070' ]

test('narrow saturation and lightness', () => {
  const narrow = narrowSL.bind({ sb: 0, sp: 62, lb: 92, lp: 216 })
  for (let hex of candidates) {
    console.log(hexToStr(hex), hslToStr(hexToHsl(hex)), narrow(hex))
  }
})