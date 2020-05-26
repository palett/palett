import { Hatsu } from '@palett/hatsu'
import { Greys } from 'palett'
import { Ob }    from 'veho'

const colorTube = Hatsu.hex

export const paint = (target, hexColor) => target |> (hexColor |> colorTube)
export const ind = (indent) => indent ? '  '.repeat(indent) : ''

export class Says {
  /**
   *
   * @param {Object<string,string>} roles
   * @param {function(*)} [logger]
   * @param {string} [defaultColor]
   * @param {string} [callSign=' -> ']
   */
  constructor (roles, { logger, defaultColor, callSign = ' -> ' } = {}) {
    this.logger = logger || console.log.bind(console)
    this.defaultColor = defaultColor || Greys.grey.base
    this.de = callSign
    this.actors = Ob.map(roles, ([role, hexColor]) => [role, paint(role, hexColor)])
  }

  static build (actors, { logger, defaultColor } = {}) {
    return new Says(actors, { logger, defaultColor })
  }

  actor (actor) {
    return (actor in this.actors)
      ? this.actors[actor]
      : paint(actor, this.defaultColor)
  }

  role (actor) {
    return Array.isArray(actor)
      ? actor.map(x => `[${this.actor(x)}]`).join(this.de)
      : `[${this.actor(actor)}]`
  }

  says (actor, message, { indent = 0 } = {}) {
    `${ind(indent)}[${this.actor(actor)}] ${message}` |> this.logger
  }

  credit (actor, { indent = 0 } = {}) {
    return this.authorize(this.role(actor), { indent })
  }

  batchCredit (...actors) {
    const ob = {}
    for (let actor of actors) {
      const isAr = Array.isArray(actor), _actor = isAr ? actor[0] : actor
      if (_actor in this.actors)
        ob[_actor] = isAr
          ? this.credit.apply(this, actor)
          : this.credit.call(this, actor)
    }
    return ob
  }

  authorize (role, { indent = 0 } = {}) {
    return message => `${ind(indent)}${role} ${message}` |> this.logger
  }
}

