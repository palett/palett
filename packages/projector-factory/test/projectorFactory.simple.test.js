import { AZURE }            from '@palett/presets'
import { logger }           from '@spare/logger'
import { ProjectorFactory } from '../src/ProjectorFactory'

const bound = { max: 1, min: 1 }
const proj = ProjectorFactory.fromHEX(bound, AZURE)
proj.render(1, 1) |> logger