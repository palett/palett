import { FRESH } from '@palett/presets'
import {  presetToFlatDye, presetToLeap, STAT_BOUND_CONFIG } from '@palett/util-fluo'
import {dyeMap} from '@table/util-dye-map'
import { Stat, StatMx } from 'borel'
import { Ar, Mx } from 'veho'

export class Visual {
  /**
   *
   * @param {*[]} arr
   * @param {{max:string|number[],min:string|number[],na:string|number[]}} [mark]
   * @param {boolean} [mutate=true]
   * @param {boolean} [retFn=false]
   */
  static vector (arr, {
    mark = FRESH,
    mutate = false,
    retFn = false
  } = {}) {
    return dyeMap(arr, {
      map: mutate ? Ar.mutateMap : Ar.map,
      valueLeap: Stat.bound(arr, STAT_BOUND_CONFIG),
      colorLeap: presetToLeap(mark),
      dye: presetToFlatDye(mark),
      colorant: retFn
    })
  }

  /**
   *
   * @param {*[][]} mx
   * @param {{max:string|number[],min:string|number[],na:string|number[]}} [mark]
   * @param {number} [direct=1] - 0:p-wise, 1:r-wise, 2:c-wise
   * @param {boolean} [mutate=true]
   * @param {boolean} [retFn=false]
   * @returns {*}
   */
  static matrix (mx, {
    mark = FRESH,
    direct = 1,
    mutate = false,
    retFn = false
  } = {}) {
    if (!Mx.isMat(mx)) throw new Error('Not valid matrix')
    switch (direct) {
      case 2:
        const mapColumns = Mx.mapColumns
        return mapColumns(mx, c => Visual.vector(c, { mark, mutate, retFn }))
      case 1:
        const mapRows = mutate ? Ar.mutateMap : Ar.map
        return mapRows(mx, r => Visual.vector(r, { mark, mutate, retFn }))
      case 0:
      default:
        const mapMatrix = mutate ? Mx.mutateMap : Mx.map
        return dyeMap(mx, {
          map: mapMatrix,
          valueLeap: StatMx.bound(mx, STAT_BOUND_CONFIG),
          colorLeap: presetToLeap(mark),
          dye: presetToFlatDye(mark),
          colorant: retFn
        })
    }
  }

  /**
   *
   * @param {*[][]} mx
   * @param {number} y
   * @param {{max:string|number[],min:string|number[],na:string|number[]}} [mark]
   * @param {boolean} [mutate=true]
   * @param {boolean} [retFn=false]
   */
  static column (mx, y, {
    mark = FRESH,
    mutate = false,
    retFn = false
  } = {}) {
    return dyeMap(mx, {
      map: mutate ? (mx, fn) => Mx.mutateCol(mx, y, fn) : (mx, fn) => Mx.mapCol(mx, y, fn),
      valueLeap: StatMx.boundCol(mx, y, STAT_BOUND_CONFIG),
      colorLeap: presetToLeap(mark),
      dye: presetToFlatDye(mark),
      colorant: retFn
    })
  }
}

// DyeVec, DyeMat, DyeEnt
// FluoVec, FluoMat, FluoEnt
// VecDant, MatDant, EntDant
// LumVec, LumMat, LumEnt
