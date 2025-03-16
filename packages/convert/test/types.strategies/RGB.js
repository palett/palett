export class RGB extends Array {
  constructor(r, g, b) {
    super(r, g, b)
  }
  get r() { return this[0] }
  set r(v) { this[0] = v }
  get g() { return this[1] }
  set g(v) { this[1] = v }
  get b() { return this[2] }
  set b(v) { this[2] = v }
}