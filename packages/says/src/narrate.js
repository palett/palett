import { LF, SP } from '@spare/enum-chars'
import { STR }    from '@typen/enum-data-types'

export const tab = ind => SP.repeat(ind << 1)

export const narrate = (text, context) => {
  let { title, des, indent, logger } = context
  let designation = `${ tab(indent) }[${ title }]`
  if (des?.length) designation += des, context.des = ''
  if (typeof text !== STR) text += ''
  return void logger(
    designation,
    text.includes(LF)
      ? (LF + text).replace(/\n/g, LF + tab(++indent))
      : text
  )
}

