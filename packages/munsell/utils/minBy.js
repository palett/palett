export const minEntry = (entries, indicator) => {
  const hi = entries?.length ?? 0
  if (hi === 0) return void 0
  if (hi === 1) return entries[0]
  let minEntry = entries[0], minValue = indicator(minEntry)
  for (let i = 1, entry, value; i < hi; i++) {
    entry = entries[i], value = indicator(entry)
    if (value < minValue) {
      minValue = value
      minEntry = entry
    }
  }
  return minEntry
}