import { FASHIONS } from './Pavtone.Fashions'
import { PRODUCTS } from './Pavtone.Products'

export class Domain {
  static fashion = 1
  static product = 2
}

export class DomainUtil {
  // dictionary<string, string>
  static ToPalett(domain) {
    switch (domain) {
      case Domain.fashion:
        return FASHIONS
      case Domain.product:
        return PRODUCTS
      default:
        return {}
    }
  }
}
