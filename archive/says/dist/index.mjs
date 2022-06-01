import { ITALIC }        from 'constants/enum-font-effects';
import { presetFlopper } from '@palett/flopper';
import { deco }          from '@spare/deco-string';
import { STR, FUN } from '@typen/enum-data-types';
import { mapper } from '@vect/object-mapper';
import { parenth, bracket } from '@spare/bracket';
import { LF, SP } from '@spare/enum-chars';

class Callable extends Function {
  constructor(f) {
    super();
    Reflect.setPrototypeOf(f, new.target.prototype);
    return f;
  }

}

const tab = ind => SP.repeat(ind << 1);
const narrate = (text, context) => {
  let {
    name,
    des,
    ind,
    log,
    att
  } = context;
  let signature = `${tab(ind)}[${name}]`;
  if (att) signature += SP + att();
  if (des !== null && des !== void 0 && des.length) signature += des, context.des = '';
  if (typeof text !== STR) text += '';
  return void log(signature, text.includes(LF) ? (LF + text).replace(/\n/g, LF + tab(++ind)) : text);
};

const NAME = 'name';
/** @type {function} */

class Pal extends Callable {
  // /** @type {string}   */ name = ''

  /** @type {string}   */
  des = '';
  /** @type {number}   */

  ind = 0;
  /** @type {Function} */

  log = console.log;
  /** @type {Function} */

  att = void 0;

  constructor(name, {
    indent = 0,
    logger,
    attach
  } = {}) {
    super(text => narrate(text, this));
    Object.defineProperty(this, NAME, {
      value: name ?? '',
      writable: true
    });
    if (indent) this.ind = indent;
    if (logger) this.log = logger;
    if (attach) this.attach(attach);
  }

  p(words) {
    return this.des += SP + words, this;
  }

  br(words) {
    return this.des += SP + parenth(words), this;
  }

  to(someone) {
    if (someone instanceof Pal) someone = someone.name;
    this.des += ' -> ' + bracket(someone);
    return this;
  }

  attach(func) {
    if (typeof func === FUN) {
      this.att = func;
    }

    return this;
  }

  detach() {
    return this.att = null, this;
  }

  level(logger) {
    if (typeof logger === STR && logger in console) {
      return this.log = console[logger], this;
    }

    if (typeof logger === FUN) {
      return this.log = logger, this;
    }

    return this;
  }

  get asc() {
    return this.ind++, this;
  }

  get desc() {
    return this.ind && this.ind--, this;
  }
  /**
   * @param {string} title
   * @param {Object} [options]
   * @returns {Pal|function}
   */


  static build(title, options) {
    return new Pal(title, options);
  }

}

class Says {
  /** @type {Object<string,Pal|function>} */
  #roster = {};
  /** @type {Generator<{max:*,min:*,na:*}>} */

  #pool = presetFlopper({
    exhausted: false
  });
  /** @type {string[]!} */

  #effects = undefined;

  constructor(roster, effects) {
    if (roster) this.#roster = roster;
    this.#effects = effects;
    return new Proxy(this, {
      /** @returns {Pal|function} */
      get(t, p) {
        if (p in t) return typeof (p = t[p]) === FUN ? p.bind(t) : p;
        if (p in t.#roster) return t.#roster[p];
        return t.aboard(p, t.#pool.next().value);
      }

    });
  }

  aboard(name, presets) {
    const effects = this.#effects;
    if (!presets) ({
      value: presets
    } = this.#pool.next());
    return this.#roster[name] = Pal.build(deco(String(name), {
      presets,
      effects
    }));
  }

  roster(name) {
    if (name) return (this.#roster[name] ?? this.aboard(name)).name;
    return mapper(this.#roster, ({
      name
    }) => name);
  }
  /**
   *
   * @param roster
   * @param effects
   * @returns {Says|Object<string,function>}
   */


  static build({
    roster,
    effects = [ITALIC]
  } = {}) {
    return new Says(roster, effects);
  }

}

/** @type {Function|Says} */

const says = new Says();
/** @type {Function} */
// const ros = says.roster.bind(says)

const ros = name => says.roster(name);

export { Says, ros, says };
