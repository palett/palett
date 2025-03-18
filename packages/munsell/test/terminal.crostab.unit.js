import { toneHex }             from '@palett/color-algebra'
import { Fluo }                from '@palett/fluo'
import { Preset }              from '@palett/presets'
import { DecoCrostab, logger } from '@spare/logger'
import { indexedTo }           from '@vect/object-mapper'
import { HSL }                 from '../archive/extends/HSL.js'
import { RGB }                 from '../archive/extends/RGB.js'
import { Gradient }            from '../archive/Gradient.js'
import { H, S }                from '../resources/attr.js'

// XTerm's default colors

// Default colors
export const PRIMARY = {
  background: '#000000',
  foreground: '#ffffff',
}

// // Normal colors
// export const NORMAL = {
//   black: '#000000',
//   red: '#cd0000',
//   green: '#00cd00',
//   yellow: '#cdcd00',
//   blue: '#0000ee',
//   magenta: '#cd00cd',
//   cyan: '#00cdcd',
//   white: '#e5e5e5',
// }

export const NORMAL = {
  black: '#3B4252',
  red: '#BF616A',
  green: '#6EEE30',
  yellow: '#EBCB8B',
  blue: '#7079F7',
  magenta: '#C379E4',
  cyan: '#88C0D0',
  white: '#E5E9F0',
}


// Bright colors
export const BRIGHT = {
  black: '#7f7f7f',
  red: '#ff0000',
  green: '#00ff00',
  yellow: '#ffff00',
  blue: '#164D8F',
  magenta: '#ff00ff',
  cyan: '#00ffff',
  white: '#ffffff',
}

for (let [ key, hex, hsl, rgb ] of indexedTo(NORMAL, (k, v) => [ k, v.toUpperCase(), HSL.fromHex(v), RGB.fromHex(v) ])) {
  Fluo.hex(`>> '${hex}', // ${key}`, hex) |> console.log
  const crostab = Gradient.crostab({
    preset: Preset.build(toneHex(hex, -15, 12, 18), toneHex(hex, 15, 30, -6)),
    axis: { x: S, y: H },
    size: { x: 4, y: 3 },
    extend: { top: 2, bottom: 2, left: 2, right: 2 },
  })
  const decoCrostab = DecoCrostab({ read: ([ hex, name ]) => Fluo.hex(`'${hex}', // ${name}`, hex), presets: [] })
  crostab.map(x => x.nearest()) |> decoCrostab |> console.log

  '>> HSL approximates' |> console.log
  for (let [ hex, name ] of hsl.approximates({ h: 24, s: 5, l: 12 })) {
    Fluo.hex(`'${hex}', // ${name}`, hex) |> console.log
  }
  '>> RGB approximates' |> console.log
  for (let [ hex, name ] of rgb.approximates({ r: 12, g: 12, b: 24 })) {
    Fluo.hex(`'${hex}', // ${name}`, hex) |> console.log
  }
  '' |> logger
}


export const NORMAL2 = {
  black: '#2B2929', // Meteorite
  red: '#E04951', // Cayenne
  green: '#A5EE6F',
  yellow: '#FFCF73', // Banana Cream
  blue: '#7079F7', //
  magenta: '#C379E4', //
  cyan: '#4DC6E2', // Bluefish
  white: '#D5CCCC', // Lilac Ash
}

export const BRIGHT2 = {
  black: '#6A6A6A', // Charcoal Gray
  red: '#CA848A', // Brandied Apricot
  green: '#AFCB80', // Sap Green
  yellow: '#F0DD9D', // Mellow Yellow
  blue: '#96B3D2', // Powder Blue
  magenta: '#D2ADD5', // Orchid Bouquet
  cyan: '#95DEE3', // Island Paradise
  white: '#e5e5e5',//
}









