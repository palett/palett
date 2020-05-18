import { hslToDye } from '../dyeBlenders/hslToDye'
import { parseHsl } from './parseHsl'

export const presetToFlat = ({ na }) => na |> parseHsl |> hslToDye
