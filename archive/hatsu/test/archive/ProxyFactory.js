import { ConsoleColors, Effects } from '../../resources/codes'

export class ProxyFactory {
  static build (hatsuInstance) {
    return new Proxy(hatsuInstance, {
      /**
       *
       * @param target
       * @param p
       * @param receiver
       * @returns {Hatsu|function(string):string}
       */
      get (target, p, receiver) {
        if (p in target) return receiver
        if (p in Effects) {
          [target.head[p], target.tail[p]] = Effects[p]
          return receiver
        }
        if (p in ConsoleColors) {
          target.color = p
          return receiver
        }
        return receiver
      },
    })
  }
}
