import { Node } from '@spare/node'

export class Fluo {
  static vector(vector, conf) {
    return (new Node(conf)).flatVector(vector)
  }
  static entries(entries, conf) {
    return (new Node(conf)).flatEntries(entries, conf.pad)
  }
  static matrix(matrix, conf) {
    return (new Node(conf)).flatMatrix(matrix)
  }
  static columns(matrix, conf) {
    return (new Node(conf)).flatColumns(matrix)
  }
  static rows(matrix, conf) {
    return (new Node(conf)).flatRows(matrix)
  }
}