/**
 *
 * @param {number} n
 * @param {number} h
 * @param {number} a
 * @param {number} l
 * @returns {number}
 */
export const hf = (n, h, a, l) => {
  const k = (n + h / 30) % 12
  return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
}
