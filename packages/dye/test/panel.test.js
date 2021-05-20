import { Indigo } from '@palett/cards'
import { logger } from '@spare/logger'
import { Panel }  from '../util/panel'

const panel = Panel.build()

panel.assignHex(Indigo.lighten_1)

panel.render('indigo') |> logger