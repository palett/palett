import { rand, betw, flop } from '@aryth/rand';
import { Munsell } from '@palett/munsell';
import { seq, init } from '@vect/vector-init';
import { NUM, STR } from '@typen/enum-data-types';
import { n } from '@aryth/norm';
import { dslHex } from '@palett/color-algebra';
import { modHsi, hsiToHsl, hexToHsi } from '@palett/convert';
import { Pres } from '@palett/pres';
import { finiteFlopper } from '@aryth/flopper';
import { round as round$1, almostEqual } from '@aryth/math';
import { Polar, PetalNote } from '@aryth/polar';

const LOTONE = {
  '#D5D5D1': 'P 161-1-1 C',
  '#A8A7A3': 'P 161-1-2 C',
  '#8B8986': 'P 161-1-3 C',
  '#C0BFBF': 'P 162-2-2 C',
  '#AAA6A5': 'P 162-2-3 C',
  '#9A9798': 'P 162-2-4 C',
  '#8B8889': 'P 162-2-5 C',
  '#BCC0C5': 'P 163-2-2 C',
  '#A5A8AF': 'P 163-2-3 C',
  '#94979E': 'P 163-2-4 C',
  '#878B94': 'P 163-2-5 C',
  '#767A85': 'P 163-2-6 C',
  '#BDC1C3': 'P 164-2-2 C',
  '#A7ABAF': 'P 164-2-3 C',
  '#979CA1': 'P 164-2-4 C',
  '#888E93': 'P 164-2-5 C',
  '#797F86': 'P 164-2-6 C',
  '#D5D2CC': 'P 165-2-1 C',
  '#C4C0B9': 'P 165-2-2 C',
  '#B3AFA7': 'P 165-2-3 C',
  '#B8A2AF': 'P 45-3-1 C',
  '#C9C3CA': 'P 53-2-1 C',
  '#ADA7B2': 'P 53-2-2 C',
  '#928A98': 'P 53-2-3 C',
  '#88889B': 'P 63-2-1 C',
  '#C2C3D8': 'P 64-2-1 C',
  '#AEABC0': 'P 64-3-2 C',
  '#9090A9': 'P 64-3-3 C',
  '#95A0B1': 'P 79-1-1 C',
  '#A3AFB7': 'P 82-3-1 C',
  '#8F9CA6': 'P 82-3-2 C',
  '#B4C7C9': 'P 93-2-1 C',
  '#8FA9AC': 'P 93-2-2 C',
  '#B7CFCD': 'P 101-1-1 C',
  '#BAC1D1': 'P 72-2-1 C',
  '#C8D1DD': 'P 73-1-1 C',
};

const MIDTONE = {
  '#C26060': 'REDx 000',
  '#C96C59': 'RYAx 010',
  '#CE8763': 'RYBx 020',
  '#C5996C': 'RYCx 030',
  '#CCAF74': 'RYDx 040',
  '#CFBF6C': 'RYEx 050',
  '#C0C06C': 'YELx 060',
  '#A9B766': 'YGAx 070',
  '#AABC84': 'YGBx 080',
  '#93AD7A': 'YGCx 090',
  '#88AB77': 'YGDx 100',
  '#8DB086': 'YGEx 110',
  '#8FB68F': 'GREx 120',
  '#73A97C': 'GCAx 130',
  '#71A683': 'GCBx 140',
  '#5FAE87': 'GCCx 150',
  '#53B594': 'GCDx 160',
  '#31B49E': 'GCEx 170',
  '#39ACAC': 'CYAx 180',
  '#38AAC1': 'CBAx 190',
  '#318BB9': 'CBBx 200',
  '#497AAB': 'CBCx 210',
  '#566E9D': 'CBDx 220',
  '#525B89': 'CBEx 230',
  '#5A5A8A': 'BLUx 240',
  '#59527E': 'BMAx 250',
  '#7E6CA1': 'BMBx 260',
  '#70568A': 'BMCx 270',
  '#7E5991': 'BMDx 280',
  '#83598B': 'BMEx 290',
  '#925D92': 'MAGx 300',
  '#914E86': 'MRAx 310',
  '#A15387': 'MRBx 320',
  '#B85A89': 'MRCx 330',
  '#C35076': 'MRDx 340',
  '#BC3D52': 'MREx 350',
  '#C94F4F': 'REDx 360',
  '#D06161': 'REDc 000',
  '#D17B6A': 'RYAc 010',
  '#CF9071': 'RYBc 020',
  '#CEA378': 'RYCc 030',
  '#CBB280': 'RYDc 040',
  '#C7BD89': 'RYEc 050',
  '#C4C48C': 'YELc 060',
  '#B8C090': 'YGAc 070',
  '#ADBC8F': 'YGBc 080',
  '#A3B98D': 'YGCc 090',
  '#98B889': 'YGDc 100',
  '#8CB982': 'YGEc 110',
  '#78B978': 'GREc 120',
  '#6DBA7A': 'GCAc 130',
  '#5FBD7F': 'GCBc 140',
  '#52C089': 'GCCc 150',
  '#47C199': 'GCDc 160',
  '#3BC3AC': 'GCEc 170',
  '#38BCBC': 'CYAc 180',
  '#379EB3': 'CBAc 190',
  '#3985AC': 'CBBc 200',
  '#3B70A4': 'CBCc 210',
  '#3F5E9B': 'CBDc 220',
  '#445191': 'CBEc 230',
  '#48488D': 'BLUc 240',
  '#574D89': 'BMAc 250',
  '#645289': 'BMBc 260',
  '#70558B': 'BMCc 270',
  '#7C568F': 'BMDc 280',
  '#8B5496': 'BMEc 290',
  '#A153A1': 'MAGc 300',
  '#AD519E': 'MRAc 310',
  '#B85195': 'MRBc 320',
  '#C05289': 'MRCc 330',
  '#C6567C': 'MRDc 340',
  '#CC5B6E': 'MREc 350',
};

/**
 * Generator function that shuffles an array by shifting elements randomly.
 *
 * @param {*[]} vec - The array to be shuffled.
 * @param {number} shl - The left shift limit for random index selection.
 * @param {number} [shr=shl] - The right shift limit for random index selection. Defaults to shl.
 * @yields {*} - The shuffled element after each swap operation.
 * @returns {undefined}
 */
function* finiteShifter(vec, shl, shr) {
  let hi = vec.length;
  // Create a copy of the array and track available indices
  const bin = Array(hi).fill(true);
  if (typeof shr !== NUM) { shr = shl; }
  let i = rand(hi);
  // First element
  if (hi > 0) {
    bin[i] = false;
    yield vec[i];
    hi--;
  }
  while (hi > 1) {
    // Adjust shift limits if needed
    shl = Math.min(shl, hi - 1);
    shr = Math.min(shr, hi - 1);
    // Calculate new index within bounds
    let newI = betw(i - shl, i + shr);
    // Wrap around if outside valid range
    while (newI >= vec.length) newI -= vec.length;
    while (newI < 0) newI += vec.length;
    // Skip already used indices
    while (!bin[newI]) {
      newI = (newI + 1) % vec.length;
    }
    // Mark as used and yield
    i = newI;
    bin[i] = false;
    yield vec[i];
    hi--;
  }
  // Last remaining element
  for (let j = 0; j < vec.length; j++) {
    if (bin[j]) {
      yield vec[j];
      break
    }
  }
  return void 0
}

const LOTONE_LIST = Object.keys(LOTONE);

/**
 *
 * @param {string} hex
 * @param {string} [name]
 * @returns Pres
 */
function randPres(hex, name) {
  const next = dslHex(hex, betw(-12, -3), betw(9, 24));
  const gray = flop(LOTONE_LIST);
  return Pres.build(hex, next, gray, null, name)
}

function hsiToPres(hsiA) {
  const munsell = this;
  hsiA = munsell.nearest(hsiA) ?? hsiA;
  let hsiB = modHsi(hsiA, n(3), -3 + n(3), 15 + n(3));
  const gray = flop(LOTONE_LIST);
  const name = munsell.name(hsiA) ?? hsiToHsl(hsiA).toString();
  return Pres.build(hsiA, hsiB, gray, null, name) // munsell.name(hsiA)
}
/**
 * @param {number} hsi
 * @returns Pres
 */
function blendPres(hsi) {
  const munsell = this;
  const hsiA = munsell.nearest(hsi);
  if (!hsiA) return null
  const next = modHsi(hsiA, betw(-15, 15), betw(-12, -3), betw(9, 24));
  const hsiB = munsell.nearest(next) ?? next;
  const gray = flop(LOTONE_LIST);
  const name = munsell.name(hsiA);
  return Pres.build(hsiA, hsiB, gray, null, name)
}

const HUES = seq(60, i => i * 6, 0);
const SATURATIONS = [ 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60 ];
const LIGHTS = [ 42, 48, 54, 56, 57, 60, 62, 63, 66, 69, 72, 75 ];

function* shiftFlopper(exhausted = true) {
  const munsell = this instanceof Munsell ? this : Munsell.build(this ?? MIDTONE, 48, 48), dock = {};
  let name;
  for (let s of finiteShifter(SATURATIONS.slice(), 3, 3))
    for (let l of finiteShifter(LIGHTS.slice(), 3, 3))
      for (let h of finiteShifter(HUES.slice(), 1, 6)) {
        const pres = blendPres.call(munsell, (h & 0x1FF) << 16 | ((s * 2) & 0xFF) << 8 | (l * 2) & 0xFF);
        if (pres === null || ((name = pres.name) in dock)) continue // console.log(hslToStr([ h, s, l ]), hslToStr(hexToHsl(hex)), 'rgb', rgbToStr(hexToRgb(hex)), name)
        dock[name] = true;
        yield pres;
      }
  const dry = Object.entries(LOTONE), rest = {};
  while (!exhausted) {
    const [ hex, name ] = flop(dry);
    yield hex in rest ? rest[hex] : (rest[hex] = randPres(hex, name));
  }
}

function* presFlopper(exhausted = true) {
  const entries = Object.entries(this ?? MIDTONE);
  for (let [ hex, name ] of finiteFlopper(entries)) {
    yield randPres(hex, name);
  }
  const rest = {};
  while (!exhausted) {
    const [ hex, name ] = flop(entries);
    yield hex in rest ? rest[hex] : (rest[hex] = randPres(hex, name));
  }
}

const { cos, PI: PI$1 } = Math;

const neonS = (h) => {
  if ((h %= 360) < 0) h += 360; // clamp to 0 to 360
  let s = 27 * cos((2 * PI$1 / 180) * (h - 20)) + 57;
  if (110 < h && h < 290) s = (s - 30) * 0.5 + 30;
  return s
};
const neonL = (h) => 72 + n(6);
const neonHSI = h => {
  let s = neonS(h), l = neonL();
  s += n(6);
  l += n(6);
  if ((h %= 360) < 0) h += 360;
  return (round$1(h) & 0x1FF) << 16 | (round$1(s * 2) & 0xFF) << 8 | round$1(l * 2) & 0xFF
};

const primS = (h) => 45 + 15 * cos(2 * PI$1 * h / 180); // 24 - 54
const primL = (h) => 54 + 12 * cos(PI$1 * (h - 60) / 180); // 42 - 66
const primHSI = h => {
  let s = primS(h), l = primL(h);
  // h += abs(n(0, 10))
  s += -1 + n(3);
  l += 6 + n(6);
  if ((h %= 360) < 0) h += 360;
  return (round$1(h) & 0x1FF) << 16 | (round$1(s * 2) & 0xFF) << 8 | round$1(l * 2) & 0xFF
};

const randHSI = h => n() > 0 ? primHSI(h) : neonHSI(h);

const { log10 } = Math;


function* fadeFlopper(count) {
  const munsell = this instanceof Munsell ? this : Munsell.build(this ?? MIDTONE, 48, 48);
  const step = count > 120 ? 0.5 : 60 / count;
  let i = 0, prev = rand(360);
  const stdev = step < 1 ? 0.5 : 2 * log10(step) + 0.5;
  while (i++ < count) {
    const curr = prev + n(stdev);
    yield hsiToPres.call(munsell, randHSI(curr));
    prev = curr + step;
  }
}

// - If `lo` is negative, the code adjusts `lo` by adding `len` and processes from there to the end, then from the start to `hi`.
// - If `hi` is greater than `len`, it processes from `lo` to the end, then from the start to `hi - len`.
// - Otherwise, it just processes from `lo` to `hi`.

function circSlice([ lo, hi ]) {
  const len = this.length;
  // Normalize indices to positive values within [0, len)
  if ((lo %= len) < 0) lo += len;
  if ((hi %= len) < 0) hi += len;
  return lo < hi
    ? this.slice(lo, hi)
    : this.slice(lo).concat(this.slice(0, hi))
}

const { PI, round } = Math;

// entries<(string hex, string name)>
function* rhodFlopper(exhausted = true) {
  const { seed, petals = 3, density = 0.1, minL = 0, devS = 50, munsell: m } = this ?? {};
  const munsell = m instanceof Munsell ? m : Munsell.build(m ?? MIDTONE, 48, 48);
  const hsi = typeof seed === STR ? hexToHsi(seed) : typeof seed === NUM ? seed : neonHSI(rand(360));//seed is hsi
  const h0 = (hsi >> 16) & 0x1FF, s0 = (hsi >> 8) & 0xFF / 2, l0 = (hsi & 0xFF) / 2;
  const polar = new Polar(l0, h0); // Create a Polar object
  const minS = s0 - devS, maxS = s0 + devS; // Create a Bound object for saturation range
  const area = PI * (l0 * l0) / (petals % 2 === 0 ? 2 : 4); // Calculate the area of the rhodonea curve
  const tSize = round(density * area); // Calculate the total size of the result list
  const uSize = tSize / petals; // Calculate the size per petal
  const stat = PetalNote.build(polar.θ, petals); // Create a PetalNote object for tracking phases
  const rest = init(petals, () => []); // Initialize an array to store remaining elements
  const hues = init(petals, i => (h0 + (360 / petals) * i) % 360); // Calculate hues for each petal
  const ranges = hues.map(hue => circSlice.call(munsell.list, munsell.range(hue, 3))); // Get ranges of munsell colors for each hue
  const flopSet = ranges.map(finiteFlopper); // Create flopper for each range
  let i = 0, phase;
  while (i < tSize) {
    let empty = true;
    for (let c = 0; c < flopSet.length; c++) {
      const { value, done } = flopSet[c].next();
      if (done) continue
      empty = false;
      const h = (value >> 16) & 0x1FF, s = (value >> 8) & 0xFF / 2, l = (value & 0xFF) / 2;
      if (l < minL) continue
      if (l > polar.foliateRadius(h, petals)) continue
      if (stat.bin[phase = stat.phase(h)] >= uSize) continue
      if (minS <= s && s <= maxS) {
        stat.notePhase(phase);
        yield hsiToPres.call(munsell, value);
        i++;
      } else {
        rest[phase].push(hsiToPres.call(munsell, value));
      }
    }
    if (empty) break
  }
  if (!exhausted) {
    const restList = Object.values(rest).flat();
    if (restList.length) {
      while (true) yield flop(restList);
    } else {
      yield hsi;
    }
  }
}

function* stageFlopper(stage = 24, stdev = 3) {
  function nextStage(stage) {
    let next = stage;
    while (almostEqual(stage, next, stage >> 1)) next += n(stage);
    return next
  }
  const munsell = this instanceof Munsell ? this : Munsell.build(this ?? MIDTONE, 48, 48);
  let prev = rand(360);
  while (true) {
    const curr = prev + n(stdev);
    yield hsiToPres.call(munsell, randHSI(curr));
    prev = curr + nextStage(stage);
  }
}

export { fadeFlopper, neonHSI, presFlopper, shiftFlopper as presShifter, primHSI, randHSI, rhodFlopper, shiftFlopper, stageFlopper };
