import { logger } from '@spare/logger'
import { Visual } from '../../Visual'

class VisualFundamentalTest {
  static vector () {
    const vec = [1, 2, 3, 4, 5, 6, 7]
    const ar = Visual.vector(vec)
    ar |> console.log
    ar |> logger
  }
}

VisualFundamentalTest.vector()

