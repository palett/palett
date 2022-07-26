import { SUBTLE } from '@palett/presets'

export function arrToPres(arr) {
  switch (arr.length) {
    case 0:
      return { pos: SUBTLE, neg: SUBTLE, str: SUBTLE }
    case 1:
      return { pos: arr[0], neg: arr[0], str: arr[0] }
    case 2:
      return { pos: arr[0], neg: arr[0], str: arr[1] }
    case 3:
    default:
      return { pos: arr[0], neg: arr[1], str: arr[2] }
  }
}