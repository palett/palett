import { duobound }            from '@aryth/bound-matrix'
import { COLUMNWISE }          from '@palett/fluo'
import { FRESH, PLANET }       from '@palett/presets'
import { DecoMatrix, logger }  from '@spare/logger'
import { isNumeric, parseNum } from '@texting/charset-fullwidth'
import { fluoMatrix }          from '../src/fluoMatrix.js'

const candidates = {
  matrix: [
    [ 'De sterrennacht', '１８９０', '文森特·梵高' ],
    [ 'Sunday Afternoon on the Island of la Grande Jatte', '１８８６', '乔治·修拉' ],
    [ 'Garçon à la pipe', '１９０５', 'Pablo Picasso' ],
    [ 'Les Joueurs de cartes', '１８９０', '保罗·塞尚' ],
  ],
  simple: [
    // ['a', 'b', 'c'],
    [ 'ａ', 'ｂ', 'ｃ' ],
    [ 'Ａ', 'Ｂ', 'Ｃ' ],
  ],
}

for (let [ k, matrix ] of Object.entries(candidates)) {
  k |> logger
  matrix |> DecoMatrix({ presets: [], full: true }) |> logger

  duobound(matrix,
    [
      Object.assign({}, FRESH, { by: isNumeric, to: parseNum }),
      PLANET,
    ],
  ) |> DecoMatrix({ presets: [], full: true }) |> logger

  fluoMatrix(matrix, {
    direct: COLUMNWISE,
    presets:
      [
        Object.assign({}, FRESH, { by: isNumeric, to: parseNum }),
        PLANET,
      ],
  }) |> DecoMatrix({ presets: [], full: true }) |> logger

}