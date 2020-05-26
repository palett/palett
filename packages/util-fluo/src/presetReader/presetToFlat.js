import { hslToDye } from '../dyer/utils/hslToDye'
import { parseHsl } from './parseHsl'

export const presetToFlat = ({ na }) => na |> parseHsl |> hslToDye
