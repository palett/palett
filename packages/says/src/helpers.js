export const toTab = ind => ' '.repeat(ind << 1)

export const render = (message, { title, indent, keywords }) =>
  `${indent |> toTab}[${title}] ${message}` |> console.log

