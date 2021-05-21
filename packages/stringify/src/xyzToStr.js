import { round } from '@aryth/math'

export const xyzToStr = (xyz) => '[' + xyz.map(x => String(round(x)).padStart(3)).join(',') + ']'