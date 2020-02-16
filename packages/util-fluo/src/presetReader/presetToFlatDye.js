import { hslToDye } from '../dyeBlenders/hslToDye'
import { parseHsl } from './parseHsl'

export const presetToFlatDye = ({ na }) => na |> parseHsl |> hslToDye
