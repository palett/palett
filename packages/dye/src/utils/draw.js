import { SGR }        from '@palett/enum-ansi-codes'
import { SC }         from '@palett/util-ansi'
import { initialize } from './initialize.js'

export function draw(text) { return this.head + text + this.tail }

