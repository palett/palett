export class Munsell {
  // (string hex, string name) 
     static comparative(this rgb rgb, float epsilon = 0.1f, domain domain = domain.fashion) {
    var cuvette = munsell.selectcuvette(domain);
    var currh = "";
    float currd = 1024;
    foreach (var entry in cuvette.hexToRgb) {
    var nextd = entry.rgb.distance(rgb);
    if (nextd < epsilon) {
    currh = entry.hex;
    break;
  }
  if (nextd < currd) {
    currh = entry.hex;
    currd = nextd;
  }
}
  return (currh, cuvette[currh]);
}

   // (string hex, string name) 
   static comparative(this hsl hsl, float epsilon = 0.1f, domain domain = domain.fashion) {
    var cuvette = munsell.selectcuvette(domain);
    var currh = "";
    float currd = 1024;
    foreach (var entry in cuvette.hexToHsl) {
      var nextd = entry.hsl.distance(hsl);
      if (nextd < epsilon) {
        currh = entry.hex;
        break;
      }
      if (nextd < currd) {
        currh = entry.hex;
        currd = nextd;
      }
    }
    return (currh, cuvette[currh]);
  }

   // list<(string hex, string name)> 
   static approximates(this rgb rgb, int top, domain domain = domain.fashion) {
    var cuvette = munsell.selectcuvette(domain);
    list<(string hex, int len)> distances = cuvette
      .hexToRgb
      .map(kvp => (kvp.hex, kvp.rgb.distance(rgb)))
      .toList();
    distances.sort((a, b) => a.len - b.len);
    return distances
      .take(top)
      .map(x => (x.hex, cuvette[x.hex]))
      .toList();
  }
  
   // list<(string hex, string name)>
   static approximates(this hsl hsl, int top, domain domain = domain.fashion) {
    var cuvette = munsell.selectcuvette(domain);
    list<(string hex, float len)> distances = cuvette
      .hexToHsl
      .map(kvp => (kvp.hex, kvp.hsl.distance(hsl)))
      .toList();
    distances.sort((a, b) => a.len >= b.len ? 1 : -1);
    return distances
      .take(top)
      .map(x => (x.hex, cuvette[x.hex]))
      .toList();
  }
  
   // list<(string hex, string name)>
   static approximates(this rgb rgb, rgb epsilon, domain domain = domain.fashion) {
    var cuvette = munsell.selectcuvette(domain);
    var distances = cuvette
      .hexToRgb
      .findall(entry => entry.rgb.almostequal(rgb, epsilon));
    return distances
      .map(x => (x.hex, cuvette[x.hex]))
      .toList();
  }
  
  // list<(string hex, string name)> 
  static approximates(this hsl hsl, hsl epsilon, domain domain = domain.fashion) {
    var cuvette = munsell.selectcuvette(domain);
    var distances = cuvette
      .hexToHsl
      .findall(entry => entry.hsl.almostequal(hsl, epsilon));
    return distances
      .map(x => (x.hex, cuvette[x.hex]))
      .toList();
}
}