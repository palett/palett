export const hue = (r, g, b, max, dif) => {
  if (dif === 0) return 0
  switch (max) {
    case r:
      return ((g - b) / dif + ((g < b) ? 6 : 0)) % 6
    case g:
      return (b - r) / dif + 2
    case b:
      return (r - g) / dif + 4
  }
}


