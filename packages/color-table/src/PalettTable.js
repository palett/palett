import { Ob, Ar, Mx } from 'veho'
import { CrosTab } from 'crostab'
import { Palett } from 'palett'
import { readify } from '../utils/readify'
import { toDataPicker, toFormatter, toStatistic } from '../utils/toFormatter'
import { Degrees } from './Degrees'
import { ColorGroups } from './ColorGroups'
import { transpose } from '@vect/matrix-transpose'

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
    space = 'hex',
    degrees = Degrees.entire,
    colors = ColorGroups.entire,
    average = false,
    cellColor = false,
  } = {}) {
    const formatter = space |> (_ => toFormatter(_, cellColor))
    const dataPicker = space |> toDataPicker
    const matrix =
      Ob.selectValues(Palett, colors)
        .map(tube =>
          Ob.selectValues(tube, degrees)
            .map(dataPicker)
        )|> transpose
    const crosTab = new CrosTab(degrees, colors.map(readify), Mx.map(matrix, formatter))
    if (average) {
      const statistic = space |> toStatistic
      const formattedStatistic = ar => ar |> statistic |> formatter
      const averageOnColumns = Mx.columns(matrix, formattedStatistic)
      crosTab.unshiftRow('average', averageOnColumns)
      const averageOnRows = [''].concat(Ar.map(matrix, formattedStatistic))
      crosTab.unshiftCol('average', averageOnRows)
    }
    return crosTab
  }
}
