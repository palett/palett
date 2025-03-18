import { CSI, FORE_INI, SGR, FORE_DEF } from '@palett/enum-ansi-codes';
import { SC } from '@palett/util-ansi';
import { serialVector, serialEntries, serialMatrix } from '@spare/serial';
import { width } from '@vect/matrix-index';

const POINTWISE$1 = 0;
const ROWWISE$1 = 1;
const COLUMNWISE$1 = 2;

function unflattenVector(vector, columnNumber) {
  const rows = [];
  for (let i = 0; i < vector.length; i += columnNumber) {
    rows.push(vector.slice(i, i + columnNumber));
  }
  return rows
}

class Fluo {
  static vector(vec, presm) {
    presm = presm ?? this;
    if (!vec?.length || !presm) return []
    return serialVector.call(presm, vec)
  }
  static entries(entries, presm) {
    presm = presm ?? this;
    if (!entries?.length || !presm) return entries
    const serial = serialEntries.call(presm, entries);
    return unflattenVector(serial, 2)
  }
  static rows(matrix, pres) {
    pres = pres ?? this;
    if (!matrix?.length || !pres) return matrix
    const serial = serialMatrix.call(pres, ROWWISE$1);
    return unflattenVector(serial, width(matrix))
  }
  static columns(matrix, pres) {
    pres = pres ?? this;
    if (!matrix?.length || !pres) return matrix
    const serial = serialMatrix.call(pres, COLUMNWISE$1);
    return unflattenVector(serial, width(matrix))
  }
  static matrix(matrix, pres, width) {
    pres = pres ?? this;
    if (!matrix?.length || !pres) return matrix
    const serial = serialMatrix.call(pres, POINTWISE$1);
    return unflattenVector(serial, width(matrix))
  }
}

// export { Pres, PresetCollection }         from './PresetCollection.js'

const POINTWISE = 0;
const ROWWISE = 1;
const COLUMNWISE = 2;

function fluo(text, [ r, g, b ]) {
  const head = CSI + (this?.head ?? '') + FORE_INI + SC + r + SC + g + SC + b + SGR;
  const tail = CSI + (this?.tail ?? '') + FORE_DEF + SGR;
  return head + text + tail
}


/**
 * @deprecated This function is deprecated and will be removed in future versions.
 * @param {*} pres - The input parameter.
 * @returns {*} The same input parameter.
 */
function intoPres(pres) { return pres }

export { COLUMNWISE, Fluo, POINTWISE, ROWWISE, fluo, intoPres };
