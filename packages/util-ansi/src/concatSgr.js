export const concatSgr = (tx, el) => tx.length
  ? el.length ? tx + ';' + el : tx
  : el