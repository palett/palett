import { LITERAL } from '@texting/regex-phrasing'
import { STR }     from '@typen/enum-data-types'

const LIT = new RegExp(LITERAL)
export function isLiteral(x) {
  if (typeof x === STR) {
    return LITERAL.test(x)
  }
  else {

  }
}