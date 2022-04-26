'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var flopper = require('@palett/flopper');
var decoString = require('@spare/deco-string');

class Callable extends Function {
  constructor(f) {
    super();
    Reflect.setPrototypeOf(f, new.target.prototype);
    return f;
  }

}

class Ros extends Callable {
  /** @type {Object<string,string>} */
  #pool = {};
  /** @type {string[]} */

  #effects = undefined;
  /**
   * @param {string[]} [effects]
   * @return {Function|Ros}
   */

  constructor(effects) {
    super(text => this.aboard(text));
    this.#effects = effects;
    this.flopper = flopper.presetFlopper({
      exhausted: false
    });
  }

  get pool() {
    return this.#pool;
  }

  aboard(name, preset) {
    var _name;

    if (name in this.pool) {
      return this.pool[name];
    }

    ({
      value: preset
    } = preset ?? this.flopper.next());
    return this.pool[name] = (_name = name, decoString.Deco({
      presets: preset,
      effects: this.#effects
    })(_name));
  }
  /**
   * @param {string[]} [effects]
   * @return {Function|Ros}
   */


  static build(effects) {
    return new Ros(effects);
  }

}

/** @type {Function|Ros} */

const ros = new Ros();

exports.Ros = Ros;
exports.ros = ros;
