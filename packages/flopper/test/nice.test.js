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

export const neonS = (h) => {
  if ((h %= 360) < 0) h += 360 // clamp to 0 to 360
  let s = 27 * Math.cos((2 * Math.PI / 180) * (h - 20)) + 57
  if (110 < h && h < 290) s = (s - 30) * 0.5 + 30
  return s
}

test('neon test', () => {
  for (let h = 0; h < 360; h += 10) {
    const s = neonS(h)
    const l = 75
    const hsl = [ h, s, l ]
    console.log(hslToStr(hsl))
  }
})
