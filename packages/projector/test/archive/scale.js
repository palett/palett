export function scale(x, xLo, lev, yLo) { return x < xLo ? yLo : (x - xLo) * lev + yLo }

