export const trimVal = n => n.toFixed().padStart(3)
export const trimColor = ([r, g, b]) => [trimVal(r), trimVal(g), trimVal(b)]