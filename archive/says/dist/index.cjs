'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var enumFontEffects = require('@palett/enum-font-effects');
var flopper = require('@palett/flopper');
var decoString = require('@spare/deco-string');
var enumDataTypes = require('@typen/enum-data-types');
var objectMapper = require('@vect/object-mapper');
var bracket = require('@spare/bracket');
var enumChars = require('@spare/enum-chars');

class Callable extends Function {
  constructor(f) {
    super();
    Reflect.setPrototypeOf(f, new.target.prototype);
    return f;
  }

}

const tab = ind => enumChars.SP.repeat(ind << 1);
const narrate = (text, context) => {
  let {
    name,
    des,
    ind,
    log,
    att
  } = context;
  let signature = `${tab(ind)}[${name}]`;
  if (att) signature += enumChars.SP + att();
  if (des !== null && des !== void 0 && des.length) signature += des, context.des = '';
  if (typeof text !== enumDataTypes.STR) text += '';
  return void log(signature, text.includes(enumChars.LF) ? (enumChars.LF + text).replace(/\n/g, enumChars.LF + tab(++ind)) : text);
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
    return this.des += enumChars.SP + words, this;
  }

  br(words) {
    return this.des += enumChars.SP + bracket.parenth(words), this;
  }

  to(someone) {
    if (someone instanceof Pal) someone = someone.name;
    this.des += ' -> ' + bracket.bracket(someone);
    return this;
  }

  attach(func) {
    if (typeof func === enumDataTypes.FUN) {
      this.att = func;
    }

    return this;
  }

  detach() {
    return this.att = null, this;
  }

  level(logger) {
    if (typeof logger === enumDataTypes.STR && logger in console) {
      return this.log = console[logger], this;
    }

    if (typeof logger === enumDataTypes.FUN) {
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

  #pool = flopper.presetFlopper({
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
        if (p in t) return typeof (p = t[p]) === enumDataTypes.FUN ? p.bind(t) : p;
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
    return this.#roster[name] = Pal.build(decoString.deco(String(name), {
      presets,
      effects
    }));
  }

  roster(name) {
    if (name) return (this.#roster[name] ?? this.aboard(name)).name;
    return objectMapper.mapper(this.#roster, ({
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
    effects = [enumFontEffects.ITALIC]
  } = {}) {
    return new Says(roster, effects);
  }

}

/** @type {Function|Says} */

const says = new Says();
/** @type {Function} */
// const ros = says.roster.bind(says)

const ros = name => says.roster(name);

exports.Says = Says;
exports.ros = ros;
exports.says = says;
