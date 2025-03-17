import { norm as initNorm } from '@aryth/rand'

export const normGen = initNorm()

export const norm = (val = 0, std = 1) => val + (normGen.next().value) * std
