export function excite() {
  if (this.head.length) this.head += ';'
  if (this.tail.length) this.tail += ';'
  return this
}