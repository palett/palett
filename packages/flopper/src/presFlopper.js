import { finiteFlopper } from '@aryth/flopper'
import { flop }          from '@aryth/rand'
import { MIDTONE }       from './asset/MIDTONE.js'
import { randPres }      from './randPres.js'

export function* presFlopper(exhausted = true) {
  const entries = Object.entries(this ?? MIDTONE)
  for (let [ hex, name ] of finiteFlopper(entries)) {
    yield randPres(hex, name)
  }
  const rest = {}
  while (!exhausted) {
    const [ hex, name ] = flop(entries)
    yield hex in rest ? rest[hex] : (rest[hex] = randPres(hex, name))
  }
}