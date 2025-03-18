import { logger, xr }                     from '@spare/logger'
import { BACK, CLR_BACK, CLR_FORE, FORE } from '../resources/colorModes.js'
import { ConsoleColors }                  from '../resources/consoleColors.js'
import { SC }                             from '../resources/controlCodes.js'
import { enclose }                        from '../src/enclose.js'


export function renderFore(color, text) {
  const head = enclose(FORE + SC + color), tail = enclose(CLR_FORE)
  return head + text + tail
}

export function renderBack(color, text) {
  const head = enclose(BACK + SC + color), tail = enclose(CLR_BACK)
  return head + text + tail
}

for (let color in ConsoleColors) {
  xr()
    .color(color)
    .fore(renderFore(ConsoleColors[color], color))
    .back(renderBack(ConsoleColors[color], color))
    |> logger
}