import { BOLD }  from '@palett/enum-font-effects'
import { ATLAS } from '@palett/presets'
import { ProjectorConfig } from '../index'

const config = ProjectorConfig.fromHEX({ min: 0, max: 5 }, Object.assign({}, ATLAS, { effects: [ BOLD ] }))
config |> console.log

config.project(0) |> console.log
config.project(1) |> console.log
config.project(2) |> console.log
config.project(3) |> console.log
config.project(4) |> console.log
config.project(5) |> console.log