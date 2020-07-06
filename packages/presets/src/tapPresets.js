export const tapPresets = (...presets) => {
  const list = []
  for (let preset of presets) list.push(preset)
  return list
}
