import { CrosTab }            from '@analys/crostab'
import { roundD1 }            from '@aryth/math'
import { init as initMatrix } from '@vect/matrix-init'
import { init as initVector } from '@vect/vector-init'
import { H, L, S } from '../resources/attr'
import { HSL }     from './HSL'
import { VaryFab } from './VaryFab'

const { sqrt } = Math


export class Gradient {
  static crostabRaw({
                      hsl: { tl: tlHSL, br: brHSL },
                      ind: { x: xInd, y: yInd },
                      size: { x: xLen, y: yLen }
                    }) {
    tlHSL = HSL.from(tlHSL)
    brHSL = HSL.from(brHSL)
    const dHSL = HSL.build(brHSL.h - tlHSL.h, brHSL.s - tlHSL.s, brHSL.l - tlHSL.l)
    const numX = xLen - 1, numY = yLen - 1

    const varyFabX = new VaryFab(tlHSL, HSL.build(dHSL.h / numX, dHSL.s / numX, dHSL.l / numX))
    const varyFabY = new VaryFab(tlHSL, HSL.build(dHSL.h / numY, dHSL.s / numY, dHSL.l / numY))

    const sideVary = varyFabX.make(xInd)
    const headVary = varyFabY.make(yInd)
    const crossVary = VaryFab.crossVary(varyFabX, varyFabY, xInd, yInd)

    const side = initVector(xLen, (x) => sideVary(x).toFixed(1))
    const head = initVector(yLen, (y) => headVary(y).toFixed(1))
    const rows = initMatrix(xLen, yLen, (x, y) => crossVary(x, y).mutate(roundD1))
    const crostab = CrosTab.from({ side, head, rows })
    crostab.incre = { x: varyFabX.getDelta(xInd), y: varyFabY.getDelta(yInd) }
    return crostab
  }

  static crostab({
                   hsl, // { tl, br },
                   ind, // { x, y }
                   size, // { x, y }
                   ext
                 }) {
    function restInd({ x, y }) {
      const ar = new Set([ H, S, L ])
      if (ar.has(x)) ar.delete(x)
      if (ar.has(y)) ar.delete(y)
      for (let x of ar) return x
      return null
    }

    const { tl: hslBase, br: hslEnd } = hsl
    const indX = ind.x, indY = ind.y, indR = restInd(ind)
    let { x: lenX, y: lenY } = size
    let segX = lenX - 1, segY = lenY - 1
    const hslGap = HSL.build(hslEnd.h - hslBase.h, hslEnd.s - hslBase.s, hslEnd.l - hslBase.l)

    const base = {
      XonX: hslBase[indX],
      YonY: hslBase[indY],
      RonX: hslBase[indR],
      RonY: hslBase[indR]
    }
    const incre = {
      XonX: hslGap[indX] / segX,
      YonY: hslGap[indY] / segY,
      RonX: hslGap[indR] / segX,
      RonY: hslGap[indR] / segY
    }
    if (ext) {
      base.XonX -= incre.XonX * ext.top
      base.YonY -= incre.YonY * ext.left
      base.RonX -= incre.RonX * ext.top
      base.RonY -= incre.RonY * ext.left
      lenX += ext.top + ext.bottom
      lenY += ext.left + ext.right
    }

    const varyX_ = (i, _) => base.XonX + incre.XonX * i
    const vary_Y = (_, j) => base.YonY + incre.YonY * j
    const varyXY = (i, j) => sqrt((base.RonX + incre.RonX * i) * (base.RonY + incre.RonY * j))

    const varyH = indX === H ? varyX_ : indY === H ? vary_Y : varyXY
    const varyS = indX === S ? varyX_ : indY === S ? vary_Y : varyXY
    const varyL = indX === L ? varyX_ : indY === L ? vary_Y : varyXY

    const coordToHsl = (x, y) => HSL.build(varyH(x, y), varyS(x, y), varyL(x, y)).restrict().mutate(roundD1)

    return CrosTab.from({
      side: initVector(lenX, (x) => varyX_(x, 0).toFixed(1)),
      head: initVector(lenY, (y) => vary_Y(0, y).toFixed(1)),
      rows: initMatrix(lenX, lenY, coordToHsl),
    })
  }
}
