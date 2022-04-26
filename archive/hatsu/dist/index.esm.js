import { rgbToInt, hexToRgb, hslToRgb }                         from '@palett/convert';
import { chainEnclose, FORE, ConsoleColors, CLR_FORE, Effects } from '@palett/util-ansi';

class Callable extends Function {
  constructor(f) {
    super();
    Reflect.setPrototypeOf(f, new.target.prototype);
    return f;
  }

}

const render = (tx, {
  color,
  head,
  tail
} = {}) => {
  let h = Array.isArray(color) ? [FORE].concat(color.slice(0, 3)) : [ConsoleColors[color] || ConsoleColors.white],
      t = [CLR_FORE],
      ve;
  if (head && (ve = Object.values(head)) && ve.length) h = h.concat(ve);
  if (tail && (ve = Object.values(tail)) && ve.length) t = t.concat(ve);
  return chainEnclose(h) + tx + chainEnclose(t);
};

class Hatsu extends Callable {
  /** @property {{color:([*,*,*]), head:{}, tail:{}}} */
  config;

  constructor(color) {
    super(msg => render(msg, this.config));
    this.config = {
      color,
      head: {},
      tail: {}
    };
    return new Proxy(this, {
      /**
       *
       * @param target
       * @param p
       * @param receiver
       * @returns {Hatsu|function(string):string}
       */
      get(target, p, receiver) {
        if (p in target) return target[p];
        if (p.startsWith('ext')) return (p = p.slice(3).toLowerCase()) in Effects ? target.removeEffect(p) : (target.clear(), receiver);
        const {
          config
        } = target;
        if (p in Effects && !(p in config.head)) return [config.head[p], config.tail[p]] = Effects[p], receiver;
        if (p in ConsoleColors) return config.color = p, receiver;
        return receiver;
      }

    });
  }

  [Symbol.toPrimitive](h) {
    const {
      config
    } = this;

    switch (h) {
      case 'string':
      case 'default':
        return render(config.color, config);

      case 'number':
        return Array.isArray(config.color) ? rgbToInt(config.color) : Number.NaN;

      default:
        throw new Error('ink Symbol.toPrimitive error');
    }
  }
  /**
   *
   * @param {number[]} arr
   * @returns {Hatsu|function}
   */


  static rgb(arr) {
    return new Hatsu(arr);
  }
  /**
   *
   * @param str
   * @returns {Hatsu|function}
   */


  static hex(str) {
    return Hatsu.rgb(hexToRgb(str));
  }
  /**
   *
   * @param arr
   * @returns {Hatsu|function}
   */


  static hsl(arr) {
    return Hatsu.rgb(hslToRgb(arr));
  }

  rgb(rgb, text) {
    const {
      config
    } = this;
    config.color = rgb;
    return text ? render(text, config) : this;
  }

  hex(hex, text) {
    const {
      config
    } = this;
    config.color = hexToRgb(hex);
    return text ? render(text, config) : this;
  }

  removeEffect(effect) {
    const {
      config
    } = this;
    delete config.head[effect];
    delete config.tail[effect];
    return this;
  }

  clear() {
    const {
      config
    } = this;
    config.head = {};
    config.tail = {};
    return this;
  }

}

export { Hatsu };
