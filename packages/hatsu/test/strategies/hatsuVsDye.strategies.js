import { Chrono } from 'elprimero'
import { CrosTabX } from 'xbrief'
import { PalettTable, Degrees, ColorGroups } from '@palett/table'
import { Hatsu } from '../../index'
import { render } from '../../src/render'
import { decoLog } from '@spare/deco'
import { dye } from '@palett/dye/src/dye'
import { Dye } from '@palett/dye/src/dyeFab'

const cxt = PalettTable.crosTab({ space: 'rgb', degrees: Degrees.entire, colors: ColorGroups.rainbow })

const numify = ([r, g, b]) => [+r, +g, +b]

const fn = function () { return this }

let dyeList = {}

class HatsuVsDyeStrategies {
  static testBind () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+5,
      paramsList: {
        lighten: [cxt.row('lighten_3').map(numify)],
        base: [cxt.row('base').map(numify)],
        darken: [cxt.row('darken_3').map(numify)],
      },
      funcList: {
        bench: arr => arr.map(x => x),
        benchOb: arr => arr.map(x => ({ x })),
        benchRGB: arr => arr.map(x => ([128, 128, 128])),
        benchBind: arr => arr.map(rgb => fn.bind(rgb)),
        hatsu: arr => arr.map(rgb => Hatsu.rgb(rgb).bold),
        render: arr => arr.map(rgb => (_ => render(_, { color: rgb, head: [1], tail: [22] }))),
        binder: arr => arr.map(rgb => Dye.bind({ rgb, effect: 'bold' })),
        blend: arr => arr.map(rgb => Dye(rgb, 'bold')),
      }
    })
    'lapse' |> console.log
    lapse |> CrosTabX.brief |> console.log
    '' |> console.log
    'result' |> console.log
    // result |> CrosTabX.brief |> console.log
    result.queryCell('lighten', 'render').map(it => 'urus'|> it)|> decoLog
    dyeList = {
      hatsu: x => result.queryCell('lighten', 'hatsu').map(dye => dye(x)),
      render: x => result.queryCell('lighten', 'render').map(dye => dye(x)),
      binder: x => result.queryCell('lighten', 'binder').map(dye => dye(x)),
      blend: x => result.queryCell('lighten', 'blend').map(dye => dye(x)),
    }
  }

  static testRender () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+5,
      paramsList: {
        urus: ['urus'],
        zagato: ['zagato'],
        leo: ['leo']
      },
      funcList: dyeList
    })
    'lapse' |> console.log
    lapse |> CrosTabX.brief |> console.log
    '' |> console.log
    'result' |> console.log
    result |> CrosTabX.brief |> console.log
  }
}

HatsuVsDyeStrategies.testBind()
HatsuVsDyeStrategies.testRender()
