export const diluteHex = (hex3) => {
  const [ r, g, b ] = hex3
  return r + r + g + g + b + b
}