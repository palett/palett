import { STR }     from '@typen/enum-data-types'
import { LITERAL } from '@texting/regex-phrasing'

const LIT = new RegExp(LITERAL)
export function isLiteral(x) {
  if (typeof x === STR) {
    return LITERAL.test(x)
  }
  else {

  }
}