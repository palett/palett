import { finiteFlopper }   from '@aryth/flopper'
import { flop }            from '@aryth/rand'
import { LOTONE, MIDTONE } from './fake-book.js'
import { randPres }        from './randPres.js'

export function* presFlopper(exhausted = true) {
  const conf = this ?? {}
  const pump = Object.entries(conf?.flow ?? MIDTONE)
  for (let [ hex, name ] of finiteFlopper(pump)) {
    yield randPres(hex, name)
  }
  const strip = Object.entries(conf?.dry ?? LOTONE)
  for (let [ hex, name ] of finiteFlopper(strip)) {
    yield randPres(hex, name)
  }
  const rest = {}
  while (!exhausted) {
    const [ hex, name ] = flop(pump)
    yield hex in rest ? rest[hex] : (rest[hex] = randPres(hex, name))
  }
}