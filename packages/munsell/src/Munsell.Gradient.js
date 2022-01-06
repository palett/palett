
export class HSBGrad {
    hsb basis;
    hsb delta;
    hsbgrad(hsb basis, hsb delta) {
    this.basis = basis;
    this.delta = delta;
  }

  public float gradh(int i) => restrict(this.basis.h + i * this.delta.h, 360);
  public float grads(int i) => limit(this.basis.s + i * this.delta.s, 100);
  public float gradb(int i) => limit(this.basis.b + i * this.delta.b, 100);

  public func<int, float> makegrad(hslattr attr) {
    switch (attr) {
      case hslattr.h: return this.gradh;
      case hslattr.s: return this.grads;
      case hslattr.l: return this.gradb;
      default:        return null;
    }
  }
}

  public  class hsbGrad2d {
    public static func<int, int, (float, float, float)> makegrad(this (hsbgrad gradx, hsbgrad grady) gradpair, hslattr attrx, hslattr attry) {
    var (gradx, grady) = gradpair;
    func<int, int, float> fnh = null, fns = null, fnb = null;
    switch (attrx) {
    case hslattr.h:
      fnh = (x, y) => gradx.gradh(x);
      break;
    case hslattr.s:
      fns = (x, y) => gradx.grads(x);
      break;
    case hslattr.l:
      fnb = (x, y) => gradx.gradb(x);
      break;
    }
    switch (attry) {
    case hslattr.h:
      fnh = (x, y) => grady.gradh(y);
      break;
    case hslattr.s:
      fns = (x, y) => grady.grads(y);
      break;
    case hslattr.l:
      fnb = (x, y) => grady.gradb(y);
      break;
    }
    // console.writeline($">> (x, y) = ({x}, {y}) [grad] (x, y) = ({gradx.gradh(x)}, {grady.gradh(y)})");
    if (fnh == null) fnh = (x, y) => (float)sqrt(gradx.gradh(x) * grady.gradh(y));
    if (fns == null) fns = (x, y) => (float)sqrt(gradx.grads(x) * grady.grads(y));
    if (fnb == null) fnb = (x, y) => (float)sqrt(gradx.gradb(x) * grady.gradb(y));
    return (x, y) => (fnh(x, y), fns(x, y), fnb(x, y));
  }
}

  // partial class
  public  class Munsell {
    public static crostab<hsl> gradientcrostab(
    this ((float, float, float) a, (float, float, float) b) hslpair,
    hslattr attrx, hslattr attry,
    int lenx, int leny
  ) {
    var hsba = hsb.fromtuple(hslpair.a);
    var hsbb = hsb.fromtuple(hslpair.b);
    var delta = hsbb - hsba;

    var gradx = new hsbgrad(hsba, delta / (lenx - 1));
    var grady = new hsbgrad(hsba, delta / (leny - 1));

    var fnside = gradx.makegrad(attrx);
    var fnhead = grady.makegrad(attry);
    var fnrows = (gradx, grady).makegrad(attrx, attry);

    var side = vec.init(lenx, x => fnside(x).tostring("f1"));
    var head = vec.init(leny, y => fnhead(y).tostring("f1"));
    var rows = mat.init((lenx, leny), fnrows);

    return crostab<hsl>.build(side, head, rows);
  }
}