export const NAME_MAPPING = {
  black: 'noir',
  red: 'rouge',
  green: 'vert',
  yellow: 'jaune',
  blue: 'bleu',
  magenta: 'magenta',
  cyan: 'cyan',
  white: 'blanc',
  background: 'back',
  foreground: 'fore',
  cursor: 'cursor',
  text: 'text',
}

export function nameMapper(key) {
  const { scope, len } = this
  key = key in NAME_MAPPING ? NAME_MAPPING[key] : key
  if (scope) key = scope + '-' + key
  return len ? key.padStart(len) : key
}

export const NameMapper = (scope, len) => {
  return nameMapper.bind({ scope, len })
}