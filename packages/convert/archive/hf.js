const { max, min } = Math

/**
 *
 * @param {number} n
 * @param {number} h
 * @param {number} a
 * @param {number} l
 * @returns {number}
 */
export const hf = (n, h, a, l) => {
  const k = (n + h) % 12
  return l - a * max(min(k - 3, 9 - k, 1), -1)
}