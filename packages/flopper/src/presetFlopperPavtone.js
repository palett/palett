import { finiteFlopper }  from '@aryth/flopper'
import { flop, randBetw } from '@aryth/rand'
import { HSL, PRODUCTS }  from '@palett/munsell'
import { Preset }         from '@palett/presets'
import { filter }         from '@vect/object-select'
import { seq }            from '@vect/vector'
import { hexToHsl }       from '@palett/convert'

const HUES = seq(36, i => i * 10 + 5, 0)
const SATURATIONS = [72, 64, 56, 48, 40, 80]
const LIGHTS = [48, 56, 64, 72, 40, 32]
const GRAYS = Object.entries(filter(PRODUCTS, (co, _) => (co = hexToHsl.call(HSL, co), co.s < 24 && 36 < co.l && co.l < 84)))

/**
 *
 * @param {string} hex
 * @param {string} [name]
 * @returns {{min:string, max:string, na:string, [name]:string}}
 */
export const randPreset = (hex, name) => {
  const [h, s, l] = hex |> hexToHsl
  const [max, _] = HSL
    .of(h + randBetw(-12, 12), s + randBetw(-12, -4), l + randBetw(8, 24))
    .restrict()
    .nearest()
  const [gray, label] = GRAYS |> flop
  const preset = Preset.build(hex, max, gray)
  if (name?.length) preset.name = name
  return preset
}


export function* presetFlopperPavtone(exhausted = true) {
  const names = {}
  for (let l of LIGHTS)
    for (let s of SATURATIONS)
      for (let h of finiteFlopper(HUES.slice())) {
        const [hex, name] = HSL.of(h, s, l).nearest()
        if (name in names) continue
        names[name] = true
        yield randPreset(hex, name)
      }
  const rest = {}
  while (!exhausted) {
    const [gray, label] = GRAYS|> flop
    yield label in rest ? rest[label] : (rest[label] = randPreset(gray, label))
  }
}

