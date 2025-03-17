import { hslToStr } from '@palett/stringify'
import { test }     from 'node:test'

export const niceS = (h) => 39 + 15 * Math.cos(2 * Math.PI * h / 180) // 24 - 54

export const niceL = (h) => 54 + 12 * Math.cos(Math.PI * (h - 60) / 180) // 42 - 66

test('nice test', () => {
  for (let h = 0; h < 360; h += 10) {
    const s = niceS(h)
    const l = niceL(h)
    const hsl = [ h, s, l ]
    console.log(hslToStr(hsl))
  }
})



test('neon test', () => {
  for (let h = 0; h < 360; h += 10) {
    const s = neonS(h)
    const l = 75
    const hsl = [ h, s, l ]
    console.log(hslToStr(hsl))
  }
})
