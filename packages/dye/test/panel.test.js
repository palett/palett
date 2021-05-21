import { Indigo } from '@palett/cards'
import { logger } from '@spare/logger'
import { DyeFab } from '../util/dyeFab'

const panel = DyeFab.build()

panel.assignHex(Indigo.lighten_1)

panel.render('indigo') |> logger