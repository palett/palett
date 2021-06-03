import { logger, xr } from '@spare/logger'
import { range }      from '@vect/vector'
import { AND }        from './constants'


export const DECIMALS = range(48, 57)
export const UPPERS = range(65, 90)
export const LOWERS = range(97, 122)
export const WORDS = [ ...DECIMALS, ...UPPERS, ...LOWERS ]
export const ASCII_COLLECTION = Object.fromEntries(
  range(32, 127).map(n => ( [ n, String.fromCharCode(n) ] ))
)

for (const [ code, char ] of Object.entries(ASCII_COLLECTION)) {
  xr()[code](char)
    [AND + 7](code & 0x7)
    [AND + 15](code & 0xf)
    [AND + 31](code & 0x1f)
    [AND + 47](code & 0x2f)
    .p(' ')
    [AND + 32](code & 0x20)
    [AND + 48](code & 0x30)
    [AND + 64](code & 0x40)
    [AND + 96](code & 0x60)

    |> logger
}
