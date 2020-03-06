import { Ob, Ar, Mx } from 'veho'
import { CrosTab } from '@analys/crostab'
import { Palett } from 'palett'
import { readify } from '../utils/readify'
import { ColorPick, Formatter, toStatistic } from '../utils/formatter'
import { Degrees } from './Degrees'
import { ColorGroups } from './ColorGroups'
import { transpose } from '@vect/matrix-transpose'
import { HEX } from '@palett/enum-color-space'
import { mapper as mapperMatrix } from '@vect/matrix-mapper'
import { mapper as mapperColumns } from '@vect/columns-mapper'
import { decoCrostab, decoTable } from '@spare/logger'
import { logger } from '@spare/logger'
import { mapper } from '@vect/vector-mapper'

export class PalettTable {
  static meta () {
    return {
      colors: ColorGroups.entire,
      degrees: Degrees.entire,
      colorGroups: Object.keys(ColorGroups),
      degreeGroups: Object.keys(Degrees)
    }
  }

  /**
   *
   * @param {string} [space='hex]
   * @param {string[]} [degrees=Degrees.entire]
   * @param {string[]} [colors=ColorGroups.entire]
   * @param {boolean} [average=false]
   * @param {boolean} [cellColor=false]
   * @returns {CrosTab|{side:string,banner:string,matrix:*[][]}}
   */
  static crosTab ({
    space = HEX,
    degrees = Degrees.entire,
    colors = ColorGroups.entire,
    average = false,
    cellColor = false,
  } = {}) {
    const formatter = space |> (_ => Formatter(_, cellColor))
    const matrix =
      Ob.selectValues(Palett, colors)
        .map(tube =>
          Ob.selectValues(tube, degrees).map(ColorPick(space))
        )|> transpose
    const crosTab = new CrosTab(degrees, colors.map(readify), mapperMatrix(matrix, formatter))
    if (average) {
      const statistic = space |> toStatistic
      const formattedStatistic = ar => ar |> statistic |> formatter
      crosTab.unshiftRow('average', mapperColumns(matrix, formattedStatistic))
      crosTab.unshiftColumn('average', [''].concat(mapper(matrix, formattedStatistic)))
    }
    return crosTab
  }
}
