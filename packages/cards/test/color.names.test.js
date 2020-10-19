import { logger } from '@spare/logger'

const colors = [
  'Red',
  'Pink',
  'Purple',
  'DeepPurple',
  'Indigo',
  'Blue',
  'LightBlue',
  'Cyan',
  'Teal',
  'Green',
  'LightGreen',
  'Lime',
  'Yellow',
  'Amber',
  'Orange',
  'DeepOrange',
  'Brown',
  'BlueGrey',
  'Grey',
]

for (let color of colors) {
  `${color.toUpperCase()} = '${color.toLowerCase()}',`|> logger
}
