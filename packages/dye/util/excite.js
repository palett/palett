import { SC } from '@palett/util-ansi'

export function excite() {
  if (this.head.length) this.head += SC
  if (this.tail.length) this.tail += SC
  return this
}