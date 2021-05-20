import { oneself } from '@ject/oneself'
import { _toDye }  from './_toDye'

/**
 * @param {Object} [preset]
 * @param {string} preset.na
 * @return {Function}
 */
export const presetToFlat = (preset) =>
  preset
    ? _toDye(preset.na)
    : oneself
