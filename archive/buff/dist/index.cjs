'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utilAnsi = require('@palett/util-ansi');

/**
 *
 * @param {string} tx
 * @returns {string}
 */

function codedBuff(tx) {
  const {
    h,
    t
  } = this;
  return utilAnsi.enclose(h) + tx + utilAnsi.enclose(t);
}

const parseEffects = effects => {
  let h = '',
      t = '';

  if (effects.length) {
    let l, r;

    for (let e of effects) if (e in utilAnsi.Effects && ([l, r] = utilAnsi.Effects[e])) h += utilAnsi.SC + l, t += utilAnsi.SC + r;
  }

  return {
    h,
    t
  };
};

/***
 *
 * @param {...string} [effects]
 * @returns {function(string):string}
 */

const Buff = (...effects) => {
  const config = parseEffects(effects);
  return codedBuff.bind(config);
};

exports.Buff = Buff;
