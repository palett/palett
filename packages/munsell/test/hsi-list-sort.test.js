import { hexToHsi, hsiToHsl } from '@palett/convert'
import { hslToStr }           from '@palett/stringify'
import { test }               from 'node:test'
import { UBITONE }            from '../resources/UBITONE.js'

function sortHSIs(list) {
  list.sort((a, b) => (a & 0xFF) - (b & 0xFF))
  list.sort((a, b) => (a >> 8 & 0xFF) - (b > 8 & 0xFF))
  list.sort((a, b) => (a >> 16 & 0x1FF) - (b >> 16 & 0x1FF))
  return list
}

test('hsi list sort', () => {
  const raw = UBITONE
  const list = Object.keys(raw).map(hexToHsi)
  console.log('length', list.length)
  // logger(list.map(hsi => [ hslToStr(hsiToHsl(hsi)), hsi ]).join('\n'))

  const sorted = sortHSIs(list)
  const entries = Object.entries(raw).map(([ hex, name ]) => [ hexToHsi(hex), hex ])
  const hsiToHex = Object.fromEntries(entries)
  for (let hsi of sorted) {
    const hex = hsiToHex[hsi], name = raw[hex]
    console.log(`'${hex}': "${name}", // '${hslToStr(hsiToHsl(hsi))}'`)
  }
})


test('hsi list sort entries', () => {
  function sortHexToHsi(entries) {
    entries.sort(([ , a ], [ , b ]) => (a & 0xFF) - (b & 0xFF))
    entries.sort(([ , a ], [ , b ]) => (a >> 8 & 0xFF) - (b > 8 & 0xFF))
    entries.sort(([ , a ], [ , b ]) => (a >> 16 & 0x1FF) - (b >> 16 & 0x1FF))
    return entries
  }
  const raw = UBITONE
  const list = Object.keys(raw).map(hexToHsi)
  console.log('length', list.length)
  // logger(list.map(hsi => [ hslToStr(hsiToHsl(hsi)), hsi ]).join('\n'))
  const entries = Object.keys(raw).map((hex) => [ hex, hexToHsi(hex) ])
  const sorted = sortHexToHsi(entries)
  for (let [ hex, hsi ] of sorted) {
    const name = raw[hex]
    console.log(`'${hex}': "${name}", // ${hslToStr(hsiToHsl(hsi))}`)
  }
})

