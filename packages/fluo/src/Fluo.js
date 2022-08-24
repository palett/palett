import { Typo } from '@spare/deco'

export class Fluo {
  static vector(vector, conf) {
    return (new Typo(conf)).flatVector(vector)
  }
  static entries(entries, conf) {
    return (new Typo(conf)).flatEntries(entries, conf.pad)
  }
  static matrix(matrix, conf) {
    return (new Typo(conf)).flatMatrix(matrix)
  }
  static columns(matrix, conf) {
    return (new Typo(conf)).flatColumns(matrix)
  }
  static rows(matrix, conf) {
    return (new Typo(conf)).flatRows(matrix)
  }
}