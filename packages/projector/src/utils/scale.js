import {
  BLI_OFF, BLI_ON, BOL_OFF, BOL_ON, CRO_OFF, CRO_ON, DIM_OFF, DIM_ON, HID_OFF, HID_ON, INV_OFF, INV_ON, ITA_OFF, ITA_ON, UND_OFF, UND_ON
} from '@palett/enum-ansi-codes'
import { SC }                                                                                                   from '@palett/util-ansi'

export function scale(x, xLo, lev, yLo) { return x < xLo ? yLo : (x - xLo) * lev + yLo }

