import { Palett, Greys } from 'palett'
import { Visual } from '../../../..'
import { Chrono } from 'elprimero'
import { Mx } from 'veho'
import { CrosTabX, MatX } from 'xbrief'
import { boxOffice } from '../asset/movieSamples'
import { Ziggurat } from 'roulett'

const { teal, deepOrange } = Palett

const zigg = new Ziggurat(6, 2)

export class VisualTest {

  static testVector () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+0, //3E+2
      paramsList: {
        simple: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { max: teal.accent_3, min: deepOrange.lighten_1 }],
        misc: [[1, 2, 3, NaN, 5, 6, 7, '-', 9, 10], { max: teal.accent_3, min: deepOrange.lighten_1 }],
        spaces: [[false, true, 1, 2, 3, '', ' ', 7, 9, 10], { max: teal.accent_3, min: deepOrange.lighten_1 }],
        sample: [['Avatar', '2,788', '244', '2009', 'James Cameron', ['James Cameron', 'Jon Landau'], 'James Cameron', '']],
        txDatas: [[
          '244', '200', '306', '400', '150', '220',
          '190', '495', '210', '250', '317', '187', '150',
          '255', '200', '250', '200', '74', '250', '200'
        ], { max: teal.accent_3, min: deepOrange.lighten_1 }],
        wierds: [[1, 2, false, undefined, NaN, Infinity, 9, 10]]
      },
      funcList: {
        vizVec: Visual.vector
      }
    })
    'lapse' |> console.log
    lapse |> CrosTabX.brief |> console.log
    '' |> console.log
    'result' |> console.log
    result |> CrosTabX.brief |> console.log
  }

  static testMatrix () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1,//3E+2,
      paramsList: {
        basic: [Mx.ini(1, 5, () => ~~zigg.next())],
        rand: [Mx.ini(4, 4, (i, j) => (i + 1) * 10 + j * 3)],
        simple: [[
          [, 2, 2,],
          [3, , 3,],
          [4, 4, ,],
        ]],
        matrix_lack: [[
          [, 3, 4,],
          [2, , 4,],
          [2, 3, ,],
        ]],
        // utils: [[
        //   [1, 2, NaN, 4, 5, 6],
        //   [5, '-', 7, 8, 9, 10],
        //   [9, 10, NaN, null, 13, 14],
        //   [13, 14, 15, 16, 17, 18]
        // ], {
        //   max: Teal.accent_3,
        //   min: DeepOrange.lighten_1
        // }],
        // many_NaNs: [[
        //   [undefined, 2, NaN, 4, 5, NaN],
        //   [5, '-', 7, undefined, 9, NaN],
        //   [9, 10, NaN, null, 13, NaN],
        //   [13, 14, 15, 16, 17, NaN]
        // ], {
        //   max: Cards.LightGreen.accent_3,
        //   min: Cards.Red.accent_2
        // }],
        // samples: [
        //   boxOffice
        // ]
      },
      funcList: {
        pointwise: (mx, color) => Visual.matrix(mx, { mark: color, direct: 0 }),
        // rowwise: (mx, color) => Visual.matrix(mx, { mark: color, direct: 1, mutate: false }),
        // columnwise: (mx, color) => Visual.matrix(mx, { mark: color, direct: 2 })
      }
    })
    'lapse' |> console.log
    lapse |> CrosTabX.brief |> console.log
    '' |> console.log
    'result' |> console.log
    // result |> CrosTabX.brief |> console.log
    // Samples.fromCrosTab(result, { sideLabel: 'parameter' }) |> deco |> console.log
    const { side, banner } = result
    for (let head of banner) {
      // const jso = Ob.ini(side, result.column(head))
      // jso |> console.log
      head |> console.log
      for (let mx of result.column(head)) {
        // mx |> deco |> console.log
        mx |> (_ => MatX.xBrief(_)) |> console.log
      }
    }

  }

  static testColumn () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1,//3E+2,
      paramsList: {
        simple: [Mx.ini(9, 10, (i, j) => (i + 1) * 10 + j), {
          max: Greys.grey.lighten_5,
          min: Greys.grey.darken_3,
          na: Greys.grey.base
        }],
        misc: [[
          [1, 2, NaN, 4, 5, 6],
          [5, '-', 7, 8, 9, 10],
          [9, 10, NaN, null, 13, 14],
          [13, 14, 15, 16, 17, 18]
        ], {
          max: teal.accent_3,
          min: deepOrange.lighten_1,
          na: Greys.grey.base
        }],
        many_NaNs: [[
          [1, 2, NaN, 4, 5, NaN],
          [5, '-', 7, 8, 9, NaN],
          [9, 10, NaN, null, 13, NaN],
          [13, 14, 15, 16, 17, NaN]
        ], {
          max: Palett.lightGreen.accent_3,
          min: Palett.red.accent_2,
          na: Greys.grey.base
        }],
        samples: [
          boxOffice
        ]
      },
      funcList: {
        _column_1: (mx, color) => Visual.column(mx, 1, { mark: color }),
        _column_3: (mx, color) => Visual.column(mx, 3, { mark: color })
      }
    })
    'lapse' |> console.log
    lapse |> CrosTabX.brief |> console.log
    '' |> console.log
    'result' |> console.log
    // result |> CrosTabX.brief |> console.log
    // Samples.fromCrosTab(result, { sideLabel: 'parameter' }) |> deco |> console.log
    const { side, banner } = result
    for (let head of banner) {
      // const jso = Ob.ini(side, result.column(head))
      // jso |> console.log
      head |> console.log
      for (let mx of result.column(head)) {
        MatX.xBrief(mx, { fluo: { on: false } }) |> console.log
      }
    }

  }
}

