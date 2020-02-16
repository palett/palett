export const expReg = /[A-Z]+|[0-9]+/g

export const sepWords = (jvExp) =>
  jvExp.replace(expReg, it => ' ' + it.toLowerCase()).trim()

/**
 *
 * @param {string} name
 * @returns {string}
 */
export const readify = name => (name |> sepWords)
  .replace('light ', 'l.')
  .replace('deep ', 'd.')
