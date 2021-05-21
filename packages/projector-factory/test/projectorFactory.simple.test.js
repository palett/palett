import { AZURE }            from '@palett/presets'
import { ProjectorFactory } from '../src/ProjectorFactory'

const bound = { min: 0, max: 100, }
const proj = ProjectorFactory.fromHEX(bound, AZURE)

proj.render(0, 'zero') |> console.log
proj.render(20, 'twenty') |> console.log
proj.render(40, 'forty') |> console.log
proj.render(60, 'sixty') |> console.log
proj.render(80, 'eighty') |> console.log
proj.render(100, 'hundred') |> console.log