import { Hatsu } from '@palett/hatsu'

const colorTube = Hatsu.hex

export const paint = (target, hexColor) => target |> (hexColor |> colorTube)
export const ind = (indent) => indent ? '  '.repeat(indent) : ''

export const TAB = ' '.repeat(2)
export const toTab = ind => ' '.repeat(ind << 1)

export const render = (message, { title, indent, keywords }) =>
  `${indent |> toTab}[${title}] ${message}` |> console.log

