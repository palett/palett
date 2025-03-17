import checkbox        from '@inquirer/checkbox'
import { MIDTONE }     from '@palett/nuance-midtone'
import { demo }        from '@palett/pres'
import { init }         from '@vect/vector-init'
import { shiftFlopper } from '../../src/shiftFlopper.js'

const FUSE = 'fuse'
console.time(FUSE)
const flopper = shiftFlopper.call(MIDTONE)
console.timeEnd(FUSE)

const choices = init(6, i => {
  const pres = flopper.next().value
  return { name: demo.call(pres, 6) + ' | ' + pres.name, value: pres.name }
})
const answer = await checkbox({
  message: 'Select a pres(et)',
  choices: choices,
})

console.log(answer)