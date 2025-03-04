import { hexToStr }   from '@palett/stringify'
import { logger, xr } from '@spare/logger'

export const sequenceLogger = (seq, na) => {
  xr('  ').br(na|> hexToStr).p('-').br(seq.map(hexToStr))|> logger
}