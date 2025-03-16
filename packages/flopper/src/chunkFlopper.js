export const niceS = (h) => 45 + 15 * Math.cos(2 * Math.PI * h / 180) // 24 - 54

export const niceL = (h) => 54 + 12 * Math.cos(Math.PI * (h - 60) / 180) // 42 - 66

export function* chunkFlopper(exhausted = true) {

}

export function* fadeFlopper(count) {

}

export class Rhodonea {
  entries
  constructor(book) {
    this.entries = Object.entries(book)
  }
  nextLevel() {}
}