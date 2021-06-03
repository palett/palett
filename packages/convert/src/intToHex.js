import { dil6 } from '../utils/hex'

export const intToHex = (int) => '#' + dil6(int.toString(16))