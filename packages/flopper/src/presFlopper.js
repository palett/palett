import { finiteFlopper }   from '@aryth/flopper'
import { flop }            from '@aryth/rand'
import { LOTONE, MIDTONE } from '@palett/munsell'
import { randPres }        from './randPres.js'

export function* presFlopper(exhausted = true) {
  const entries = Object.entries(MIDTONE)
  for (let [ hex, name ] of finiteFlopper(entries)) {
    yield randPres(hex, name)
  }
  for (let [ hex, name ] of finiteFlopper(Object.entries(LOTONE))) {
    yield randPres(hex, name)
  }
  const rest = {}
  while (!exhausted) {
    const [ hex, name ] = flop(entries)
    yield hex in rest ? rest[hex] : (rest[hex] = randPres(hex, name))
  }
}