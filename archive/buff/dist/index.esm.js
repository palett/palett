import { enclose, Effects, SC } from '@palett/util-ansi';

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
  return enclose(h) + tx + enclose(t);
}

const parseEffects = effects => {
  let h = '',
      t = '';

  if (effects.length) {
    let l, r;

    for (let e of effects) if (e in Effects && ([l, r] = Effects[e])) h += SC + l, t += SC + r;
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

export { Buff };
