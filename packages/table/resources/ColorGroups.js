import {
  RED, PINK, PURPLE, DEEPPURPLE,
  INDIGO, BLUE, LIGHTBLUE, CYAN,
  TEAL, GREEN,
  LIGHTGREEN, LIME, YELLOW,
  AMBER, ORANGE, DEEPORANGE,
  BROWN, BLUEGREY, GREY
} from '@palett/enum-color-cards'

const red = [RED, PINK,]
const purple = [PURPLE, DEEPPURPLE,]
const blue = [INDIGO, BLUE, LIGHTBLUE, CYAN,]
const green = [TEAL, GREEN,]
const yellowGreen = [LIGHTGREEN, LIME, YELLOW,]
const orange = [AMBER, ORANGE, DEEPORANGE,]
const grey = [BROWN, BLUEGREY, GREY]
const rainbow = [].concat(red, purple, blue, green, yellowGreen, orange)
const entire = rainbow.concat(grey)

export const ColorGroups = {
  red,
  purple,
  blue,
  green,
  yellowGreen,
  orange,
  grey,
  rainbow,
  entire
}

