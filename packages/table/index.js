import { samplesToCrostab } from '@analys/convert';
import { Crostab } from '@analyz/crostab';
import { oneself } from '@ject/oneself';
import { Cards } from '@palett/cards';
import { hexToRgb, hexToHsl } from '@palett/convert';
import { DyeFactory } from '@palett/dye';
import { HEX, RGB, HSL } from '@palett/enum-color-space';
import { INVERSE } from '@palett/enum-font-effects';
import { mapper } from '@vect/vector-mapper';
import { BROWN, BLUEGREY, GREY, AMBER, ORANGE, DEEPORANGE, LIGHTGREEN, LIME, YELLOW, TEAL, GREEN, INDIGO, BLUE, LIGHTBLUE, CYAN, PURPLE, DEEPPURPLE, RED, PINK } from '@palett/enum-color-cards';
import { init } from '@vect/vector-init';

const red = [ RED, PINK ];
const purple = [ PURPLE, DEEPPURPLE ];
const blue = [ INDIGO, BLUE, LIGHTBLUE, CYAN ];
const green = [ TEAL, GREEN ];
const yellowGreen = [ LIGHTGREEN, LIME, YELLOW ];
const orange = [ AMBER, ORANGE, DEEPORANGE ];
const grey = [ BROWN, BLUEGREY, GREY ];
const rainbow = [].concat(red, purple, blue, green, yellowGreen, orange);
const entire = rainbow.concat(grey);

const ColorGroups = {
  red,
  purple,
  blue,
  green,
  yellowGreen,
  orange,
  grey,
  rainbow,
  entire,
};

const
  accents = init(4, i => `accent_${i + 1}`).reverse(),
  lightens = init(5, i => `lighten_${i + 1}`).reverse(),
  darkens = init(4, i => `darken_${i + 1}`);

const Degrees = {
  entire: [ ...accents, ...lightens, 'base', ...darkens ],
  base: [ 'base' ],
  lightens: lightens,
  darkens: darkens,
  accents: accents,
  readable: [ ...accents.slice(-3), ...lightens.slice(-3), 'base' ],
};

// const lexicon = [
//   [/light/gi, 'l'],
//   [/deep/gi, 'd']
// ] |> makeReplaceable

// export const shortenDescription = name => name.replace(lexicon, x => camelToSnake(x, '.'))

function palettCrostab({
                                space = HEX,
                                degrees = Degrees.entire,
                                colors = ColorGroups.entire,
                                dyed = false,
                              } = {}) {
  const crostab = Crostab.from(samplesToCrostab(Cards, { side: colors, head: degrees })).transpose();
  if (space !== HEX) {
    crostab.mutate(space === RGB ? hexToRgb : space === HSL ? hexToHsl : oneself);
  }
  if (dyed) {
    const dyeFactory = DyeFactory.build(space, [ INVERSE ]);
    space === HEX
      ? crostab.mutate(hex => dyeFactory(hex)(hex))
      : crostab.mutate(xyz => dyeFactory(xyz)(mapper(xyz, v => v.toFixed(0).padStart(3))));
  }
  return crostab
  // .mutateBanner(shortenDescription)
}

const meta = () => ({
  colors: ColorGroups.entire,
  degrees: Degrees.entire,
  colorGroups: Object.keys(ColorGroups),
  degreeGroups: Object.keys(Degrees),
});

export { ColorGroups, Degrees, meta, palettCrostab };
