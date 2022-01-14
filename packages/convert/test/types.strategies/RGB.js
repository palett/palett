export class RGB extends Array {
  constructor(r, g, b) {
    super(r, g, b)
  }
  get r() { return this[0] }
  get g() { return this[1] }
  get b() { return this[2] }
  set r(v) { this[0] = v }
  set g(v) { this[1] = v }
  set b(v) { this[2] = v }
}