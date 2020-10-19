import { Dye }                               from '@palett/dye'
import { PreDye }                            from '@palett/dye/src/PreEffect'
import { BOLD }                              from '@palett/enum-font-effects'
import { ColorGroups, Degrees, PalettTable } from '@palett/table'
import { delogger }                          from '@spare/deco'
import { decoCrostab, logger, says }         from '@spare/logger'
import { strategies }                        from '@valjoux/strategies'
import { Hatsu }                             from '../../index'
import { render }                            from '../../src/render'

const cxt = PalettTable.degreesByColors({ space: 'rgb', degrees: Degrees.entire, colors: ColorGroups.rainbow })

const numify = ([r, g, b]) => [+r, +g, +b]

const fn = function () { return this }

let dyeList = {}

class HatsuVsDyeStrategies {
  static testBind () {
    const preEffect = PreDye(BOLD)
    const { lapse, result } = strategies({
      repeat: 1E+5,
      candidates: {
        lighten: [cxt.row('lighten_3').map(numify)],
        base: [cxt.row('base').map(numify)],
        darken: [cxt.row('darken_3').map(numify)],
      },
      methods: {
        bench: arr => arr.map(x => x),
        benchOb: arr => arr.map(x => ({ x })),
        benchRGB: arr => arr.map(x => ([128, 128, 128])),
        benchBind: arr => arr.map(rgb => fn.bind(rgb)),
        hatsu: arr => arr.map(rgb => Hatsu.rgb(rgb).bold),
        render: arr => arr.map(rgb => (_ => render(_, { color: rgb, head: [1], tail: [22] }))),
        binder: arr => arr.map(rgb => Dye.bind({ rgb, effect: 'bold' })),
        preEffect: arr => arr.map(preEffect),
        blend: arr => arr.map(rgb => Dye(rgb, 'bold')),
      }
    })
    lapse |> decoCrostab |> logger
    'result' |> console.log
    // result |> decoCrostab |> says['result']
    result.cell('lighten', 'preEffect').map(it => 'urus'|> it)|> delogger
    dyeList = {
      hatsu: x => result.cell('lighten', 'hatsu').map(dye => dye(x)),
      render: x => result.cell('lighten', 'render').map(dye => dye(x)),
      binder: x => result.cell('lighten', 'binder').map(dye => dye(x)),
      blend: x => result.cell('lighten', 'blend').map(dye => dye(x)),
    }
  }

  static testRender () {
    const { lapse, result } = strategies({
      repeat: 1E+5,
      candidates: {
        urus: ['urus'],
        zagato: ['zagato'],
        leo: ['leo']
      },
      methods: dyeList
    })
    lapse |> decoCrostab |> says['lapse']
    '' |> logger
    result |> decoCrostab |> says['result']
  }
}

HatsuVsDyeStrategies.testBind()
HatsuVsDyeStrategies.testRender()
