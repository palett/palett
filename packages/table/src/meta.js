import { ColorGroups } from '../resources/ColorGroups.js'
import { Degrees }     from '../resources/Degrees.js'

export const meta = () => ({
  colors: ColorGroups.entire,
  degrees: Degrees.entire,
  colorGroups: Object.keys(ColorGroups),
  degreeGroups: Object.keys(Degrees),
})
