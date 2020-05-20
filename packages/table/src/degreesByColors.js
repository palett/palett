import { CrosTab }                 from '@analys/crostab'
import { Cards }                   from '@palett/cards'
import { delogger }                from '@spare/deco'
import { transpose }               from '@vect/matrix-transpose'
import { HEX }                     from '@palett/enum-color-space'
import { mapper }                  from '@vect/vector-mapper'
import { selectValues }            from '@vect/object-select'
import { mapper as mapperMatrix }  from '@vect/matrix-mapper'
import { mapper as mapperColumns } from '@vect/columns-mapper'
import { Formatter }               from '../utils/Formatter'
import { readify }                 from '../utils/readify'
import { Degrees }                 from '../resources/Degrees'
import { ColorGroups }             from '../resources/ColorGroups'
import { ColorPicker } from '../utils/ColorPicker'
import { VectorAverage } from '../utils/VectorAverage'

const AVERAGE = 'average'

/**
 *
 * @param {string} [space='hex]
 * @param {string[]} [degrees=Degrees.entire]
 * @param {string[]} [colors=ColorGroups.entire]
 * @param {boolean} [average=false]
 * @param {boolean} [cellColor=false]
 * @returns {CrosTab|{side:string,banner:string,matrix:*[][]}}
 */
export function degreesByColors ({
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
    head = mapper(colors, readify),
    rows = transpose(columns),
    crostab = new CrosTab(side, head, mapperMatrix(rows, formatter))
  if (average) {
    const vecAv = VectorAverage(space)
    const stat_format = row => row |> vecAv |> formatter
    crostab
      .unshiftRow(AVERAGE, mapperColumns(rows, stat_format), w)
      .unshiftColumn(AVERAGE, [''].concat(mapper(rows, stat_format, h)))
  }
  return crostab
}



