// if ((attr >>= 0) && (attr & 0x1)) head += '1;', tail += '21;' // 1	Bold or increased
// if ((attr >>= 1) && (attr & 0x1)) head += '2;', tail += '22;' // 2	Faint, decreased intensity, or dim
// if ((attr >>= 1) && (attr & 0x1)) head += '3;', tail += '23;' // 3	Italic
// if ((attr >>= 1) && (attr & 0x1)) head += '4;', tail += '24;' // 4	Underline
// if ((attr >>= 1) && (attr & 0x1)) head += '5;', tail += '25;' // 5	Slow blink
// if ((attr >>= 1) && (attr & 0x1)) head += '6;', tail += '26;' // 6	Rapid blink
// if ((attr >>= 1) && (attr & 0x1)) head += '7;', tail += '27;' // 7	Reverse video or invert
// if ((attr >>= 1) && (attr & 0x1)) head += '8;', tail += '28;' // 8	Conceal or hide
// if ((attr >>= 1) && (attr & 0x1)) head += '9;', tail += '29;' // 9	Crossed-out, or strike

import { initialize } from '../src/utils/initialize.js'


const CANDIDATES = [
  0b000000000,
  0b000000001,
  0b100000000,
  0b101010101,
  0b010101010,
  0b000000101
]
for (let n of CANDIDATES) {
  const body = {}
  initialize.call(body, n)
  body |> console.log
}
