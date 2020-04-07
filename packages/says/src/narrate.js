import { STR } from '@typen/enum-data-types'
import { LF, SP } from '@spare/enum-chars'

export const tab = ind => SP.repeat(ind << 1)

export const narrate = (text, options) => {
  let { title, des, indent } = options
  let designation = `${tab(indent)}[${title}]`
  if (des?.length) designation += des, options.des = ''
  if (typeof text !== STR) text += ''
  return void console.log(
    designation,
    text.includes(LF)
      ? (LF + text).replace(/\n/g, LF + tab(++indent))
      : text
  )
}

