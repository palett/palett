import { STR } from '@typen/enums'
import { LF } from '@spare/util'

export const tab = ind => ' '.repeat(ind << 1)

export const logger = (text, { title, indent, keywords }) => {
  if (typeof text !== STR) text += ''
  return void console.log(`${tab(indent)}[${title}]`,
    text.includes(LF)
      ? (LF + text).replace(/\n/g, LF + tab(++indent))
      : text)
}

