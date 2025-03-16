import { hexToHsi, hexToHsl, hslToHex } from '@palett/convert'
import { hexToStr, hslToStr }           from '@palett/stringify'
import { indexedOf }                    from '@vect/object-mapper'
import { test }                         from 'node:test'
import { MIDTONE }                      from '../resources/MIDTONE.js'
import { Munsell }                      from '../src/Munsell.js'

const ROEM = {
  'REDx 000': '#C26060',
  'RYAx 010': '#C96C59',
  'RYBx 020': '#CE8763',
  'RYCx 030': '#C5996C',
  'RYDx 040': '#CCAF74',
  'RYEx 050': '#CFBF6C',
  'YELx 060': '#C0C06C',
  'YGAx 070': '#A9B766',
  'YGBx 080': '#AABC84',
  'YGCx 090': '#93AD7A',
  'YGDx 100': '#88AB77',
  'YGEx 110': '#8DB086',
  'GREx 120': '#8FB68F',
  'GCAx 130': '#73A97C',
  'GCBx 140': '#71A683',
  'GCCx 150': '#5FAE87',
  'GCDx 160': '#53B594',
  'GCEx 170': '#31B49E',
  'CYAx 180': '#39ACAC',
  'CBAx 190': '#38AAC1',
  'CBBx 200': '#318BB9',
  'CBCx 210': '#497AAB',
  'CBDx 220': '#566E9D',
  'CBEx 230': '#525B89',
  'BLUx 240': '#5A5A8A',
  'BMAx 250': '#59527E',
  'BMBx 260': '#7E6CA1',
  'BMCx 270': '#70568A',
  'BMDx 280': '#7E5991',
  'BMEx 290': '#83598B',
  'MAGx 300': '#925D92',
  'MRAx 310': '#914E86',
  'MRBx 320': '#A15387',
  'MRCx 330': '#B85A89',
  'MRDx 340': '#C35076',
  'MREx 350': '#BC3D52',
  'REDx 360': '#C94F4F',
}

const CAMP = {
  'RED 000': '#BF3F3F',
  'RYA 010': '#BF543F',
  'RYB 020': '#BF6A3F',
  'RYC 030': '#BF7F3F',
  'RYD 040': '#BF943F',
  'RYE 050': '#BFAA3F',
  'YEL 060': '#BFBF3F',
  'YGA 070': '#AABF3F',
  'YGB 080': '#94BF3F',
  'YGC 090': '#7FBF3F',
  'YGD 100': '#6ABF3F',
  'YGE 110': '#54BF3F',
  'GRE 120': '#3FBF3F',
  'GCA 130': '#3FBF55',
  'GCB 140': '#3FBF6A',
  'GCC 150': '#3FBF7F',
  'GCD 160': '#3FBF94',
  'GCE 170': '#3FBFA9',
  'CYA 180': '#3FBFBF',
  'CBA 190': '#3FA9BF',
  'CBB 200': '#3F94BF',
  'CBC 210': '#3F7FBF',
  'CBD 220': '#3F6ABF',
  'CBE 230': '#3F55BF',
  'BLU 240': '#3F3FBF',
  'BMA 250': '#543FBF',
  'BMB 260': '#6A3FBF',
  'BMC 270': '#7F3FBF',
  'BMD 280': '#943FBF',
  'BME 290': '#AA3FBF',
  'MAG 300': '#BF3FBF',
  'MRA 310': '#BF3FAA',
  'MRB 320': '#BF3F94',
  'MRC 330': '#BF3F7F',
  'MRD 340': '#BF3F6A',
  'MRE 350': '#BF3F54',
  'RED 360': '#BF3F3F',

}

test('Munsell nearest function test', () => {
  const Midtone = Munsell.build(MIDTONE)
  for (const [ name, hex ] of indexedOf({ ...ROEM, ...CAMP })) {
    const hsl = hexToHsl(hex)
    const hsi = hexToHsi(hex)
    const entry = Midtone.nearestEntry(hsi)
    if (!entry) {
      console.log(hexToStr(hslToHex(hsl)), hslToStr(hsl), null)
      continue
    }
    const [ hex2, name2 ] = entry
    console.log(name, hslToStr(hsl), hexToStr(hex), '→', hslToStr(hexToHsl(hex2)), hexToStr(hex2), name2)
  }
})