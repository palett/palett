import { CrosTab }                 from '@analys/crostab'
import { Cards }                   from '@palett/cards'
import { HEX }                     from '@palett/enum-color-space'
import { mapper as mapperColumns } from '@vect/columns-mapper'
import { mapper as mapperMatrix }  from '@vect/matrix-mapper'
import { transpose }               from '@vect/matrix-transpose'
import { selectValues }            from '@vect/object-select'
import { mapper }                  from '@vect/vector-mapper'
import { ColorGroups }             from '../resources/ColorGroups'
import { Degrees }                 from '../resources/Degrees'
import { ColorPicker }             from '../utils/ColorPicker'
import { Formatter }               from '../utils/Formatter'
import { VectorAverage }           from '../utils/VectorAverage'
import { shortenDescription }      from './palettCrostab'

const AVERAGE = 'average'


// if (average && space !== HEX) {
//   const stat = Stat({
//     init: () => ([0, 0, 0]),
//     acc: (pr, cu) => mutazip(pr, cu, (p, c) => p + c, 3)
//   })
//   const averageSide = crostab.rows.map(row => stat(row).map(x => round(x / row.length)))
//   const averageHead = crostab.columns.map(row => stat(row).map(x => round(x / row.length)))
//   averageHead.unshift([0, 0, 0])
//   crostab.unshiftColumn('average', averageSide)
//   crostab.unshiftRow('average', averageHead)
// }


/**
 *
 * @param {string} [space='hex]
 * @param {string[]} [degrees=Degrees.entire]
 * @param {string[]} [colors=ColorGroups.entire]
 * @param {boolean} [average=false]
 * @param {boolean} [cellColor=false]
 * @returns {CrosTab|{side:string,banner:string,matrix:*[][]}}
 */
export function degreesByColors({
                                  space = HEX,
                                  degrees = Degrees.entire,
                                  colors = ColorGroups.entire,
                                  average = false,
                                  cellColor = false,
                                } = {}) {
  const h = degrees.length, w = colors.length
  const
    formatter = Formatter(space, cellColor),
    colorPicker = ColorPicker(space)
  const columns = mapper(
    selectValues(Cards, colors),
    card => mapper(selectValues(card, degrees), colorPicker, h),
    w
  )
  const
    side = degrees,
    head = mapper(colors, shortenDescription),
    rows = transpose(columns),
    crostab = new CrosTab(side, head, mapperMatrix(rows, formatter))
  if (average) {
    const vectorAverage = VectorAverage(space)
    const stat_format = row => row |> vectorAverage |> formatter
    crostab
      .unshiftRow(AVERAGE, mapperColumns(rows, stat_format), w)
      .unshiftColumn(AVERAGE, [''].concat(mapper(rows, stat_format, h)))
  }
  return crostab
}



