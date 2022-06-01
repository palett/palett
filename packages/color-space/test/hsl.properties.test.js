import { HSL } from '../src/HSL'

const hsl = HSL.fromRgb([92, 92, 255]);

`[h] (${hsl.h}) [s] (${hsl.s}) [l] (${hsl.l})` |> console.log