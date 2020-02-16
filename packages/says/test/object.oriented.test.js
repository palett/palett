import { Says } from '../index'
import { castList } from './assets/Bistro'

export const ooTest = () => {
  const says = Says.build(castList)

  says.says('chef', '\'Shakespeare\'')
  says.says('aboyeur', '\'Dickens\'')
}
