import { betw }           from '@aryth/rand'
import { hslToInt, intToRgb } from '@palett/convert'
import { test }               from 'node:test'

const PARAM = 85.33333333333333

const abc = () => {


}

export function hsiToInt_grok(int) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  // Normalize HSL2 values to [0,1]
  h = h / 60  // Hue mapped from [0,511] to [0,1]
  s = s / 200  // Saturation mapped from [0,255] to [0,1]
  l = l / 200  // Lightness mapped from [0,255] to [0,1]
  let r, g, b
  // If saturation is 0, it's grayscale
  if (s === 0) {
    l = (l * 255) & 0xFF
    return l << 16 | l << 8 | l
  }
  const min = Math.min(l, 1 - l)
  const lb = l + s * min // When lightness is low, increase it proportionally to saturation
  const lp = l - s * min // "lightness complement" of "lightness adjustment" relative to "lightness"
  function morph(lb, lp, ah) {
    ah %= 6
    if (ah < 1) return lb + (lp - lb) * ah
    if (ah < 3) return lp
    if (ah < 4) return lb + (lp - lb) * (4 - ah)
    return lb
  }
  // Compute RGB in [0,1]
  r = morph(lp, lb, h + 2) * 255
  g = morph(lp, lb, h + 0) * 255
  b = morph(lp, lb, h - 2) * 255
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}
export function hsiToInt_edge(int) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  h = h / 30
  s += 0.5
  l += 0.5
  function channel(hp, h, co, l) {
    let ph = (hp + h) % 12 // Calculate modular position in color wheel, 相位偏移
    ph = 3 + (ph < 6 ? ph - 6 : 6 - ph) // Create triangular wave pattern, 对称波形生成
    ph = ph > 1 ? 1 : ph < -1 ? -1 : ph // Clamp to [-1, 1] range, 钳制到 [-1, 1]
    return ((l - co * ph) * 2.55 + 0.5) >> 1
  }
  const co = s * (l <= 100 ? l : 200 - l) / 200 // When lightness is low, increase it proportionally to saturation, 亮度系数, coefficient or chroma
  const r = channel(0, h, co, l)
  const g = channel(8, h, co, l)
  const b = channel(4, h, co, l)
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}
export function hsiToInt_next(int) {
  // 解析输入（优化位运算和归一化）
  const h = (int >> 16 & 0x1FF) / 30,    // 0-17 范围
    s = (int >> 8 & 0xFF) + 0.5,     // 0.5-255.5
    l = (int & 0xFF) + 0.5           // 0.5-255.5
  // 亮度系数计算（更清晰的数学表达）
  const coeff = s * (l <= 100 ? l : 200 - l) / 200
  // 色相通道计算器（参数重命名 + 数学优化）
  const channel = (offset) => {
    let ph = (offset + h) % 12     // 相位偏移
    ph = 3 + (ph < 6 ? ph - 6 : 6 - ph) // 对称波形生成
    ph = ph > 1 ? 1 : ph < -1 ? -1 : ph
    return ((l - coeff * ph) * 2.55 + 0.5) >> 1
  }
  // 转换并打包 RGB（优化数值转换）
  return (channel(0) & 0xFF) << 16 | (channel(8) & 0xFF) << 8 | (channel(4)) & 0xFF
}
export function hsiToInt_epic(int) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  const hsl = [ h, s / 2, l / 2 ]
  return hslToInt(hsl)
}

test('hsl to rgb 25bit', () => {
  const h = betw(0, 360)
  const s = betw(0, 200)
  const l = betw(0, 200)
  const hsl = [ h, s, l ]
  const hslVal = (h & 0x1FF) << 16 | (s & 0xFF) << 8 | l & 0xFF
  console.log('hsl', h, s, l)
  const TEST_GROK = 'hsi → int - grok'
  const TEST_EPIC = 'hsi → int - epic'
  const TEST_EDGE = 'hsi → int - edge'
  const TEST_NEXT = 'hsi → int - next'

  const quant = 1e8
  console.log(TEST_GROK, intToRgb(hsiToInt_grok(hslVal)))
  console.log(TEST_EPIC, intToRgb(hsiToInt_epic(hslVal)))
  console.log(TEST_EDGE, intToRgb(hsiToInt_edge(hslVal)))
  console.log(TEST_NEXT, intToRgb(hsiToInt_next(hslVal)))

  console.time(TEST_GROK)
  for (let i = 0; i < quant; i++) hsiToInt_grok(hslVal)
  console.timeEnd(TEST_GROK)

  console.time(TEST_EPIC)
  for (let i = 0; i < quant; i++) hsiToInt_epic(hslVal)
  console.timeEnd(TEST_EPIC)

  console.time(TEST_EDGE)
  for (let i = 0; i < quant; i++) hsiToInt_edge(hslVal)
  console.timeEnd(TEST_EDGE)

  console.time(TEST_NEXT)
  for (let i = 0; i < quant; i++) hsiToInt_next(hslVal)
  console.timeEnd(TEST_NEXT)

})
