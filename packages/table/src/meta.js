import { ColorGroups } from '../resources/ColorGroups'
import { Degrees }     from '../resources/Degrees'

export const meta = () => ({
  colors: ColorGroups.entire,
  degrees: Degrees.entire,
  colorGroups: Object.keys(ColorGroups),
  degreeGroups: Object.keys(Degrees)
})
