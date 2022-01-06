
    // (byte r, byte g, byte b)
     export function relative( (byte r, byte g, byte b) rgb, (byte r, byte g, byte b) it) {
    return ((byte)abs(rgb.r - it.r), (byte)abs(rgb.g - it.g), (byte)abs(rgb.b - it.b));
  }
  // (float h, float s, float l)
   export function relative( (float h, float s, float l) hsl, (float h, float s, float l) it) {
    return (pol.distance(hsl.h, it.h), abs(hsl.s - it.s), abs(hsl.l - it.l));
  }

  // int
   export function  distance( rgb,  sub) {
    const (r, g, b) = rgb.relative(sub);
    return r + g + b;
  }

  // float
   export function  distance(hsl, sub) {
    const (h, s, l) = hsl.relative(sub);
    return h + s + l;
  }

  // bool
   export function  almostEqual( (byte r, byte g, byte b) rgb, (byte r, byte g, byte b) sub, (byte r, byte g, byte b) epsilon) {
    return abs(rgb.r - sub.r) < epsilon.r && abs(rgb.g - sub.g) < epsilon.g && abs(rgb.b - sub.b) < epsilon.b;
  }

  // bool
   export function  almostEqual( (float h, float s, float l) hsl, (float h, float s, float l) sub, (float h, float s, float l) epsilon) {
    return pol.distance(hsl.h, sub.h) < epsilon.h && abs(hsl.s - sub.s) < epsilon.s && abs(hsl.l - sub.l) < epsilon.l;
  }

  // bool
   export function  almostEqual( (float h, float s, float l) hsl, (double r, double θ) polar, (double r, double θ) polarepsilon, (double min, double max) saturationInterval) {
    return math.almostEqual(hsl.h, polar.θ, polarepsilon.θ) &&
      saturationInterval.has(hsl.s) &&
      math.almostEqual(hsl.l, polar.r, polarepsilon.r);
  }
