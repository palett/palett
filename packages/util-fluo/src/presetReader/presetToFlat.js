import { hslToDye } from '../prepDye/utils/hslToDye'
import { parseHsl } from './parseHsl'

export const presetToFlat = ({ na }) => na |> parseHsl |> hslToDye
