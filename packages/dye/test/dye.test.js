import { DyeFactory } from '@palett/dye-factory'
import { RGB }        from '@palett/enum-color-space'
import { UNDERLINE } from '@palett/enum-font-effects'
import { Dye }       from '../src/dye'

// export const dye = Dye.bind({ head: '', tail: '' })
'some' |> DyeFactory.prep(RGB, UNDERLINE)([ 127, 127, 127 ]) |> console.log
'some' |> Dye([ 127, 127, 127 ]) |> console.log
