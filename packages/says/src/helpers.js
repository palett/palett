import { STR } from '@typen/enums'
import { RN } from '@spare/util'

export const tab = ind => ' '.repeat(ind << 1)

export const logger = (text, { title, indent, keywords }) => {
  if (typeof text !== STR) text += ''
  return void console.log(`${tab(indent)}[${title}]`,
    text.includes(RN)
      ? (RN + text).replace(/\r\n/g, RN + tab(++indent))
      : text)
}

