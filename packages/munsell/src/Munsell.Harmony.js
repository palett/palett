  export class Munsell {
    // public static ienumerable<t> distinctby<t, tk>
    //   (this ienumerable<t> source, func<t, tk> keyselector) {
    //   var seenkeys = new hashset<tk>();
    //   foreach (var element in source) {
    //     if (seenkeys.add(keyselector(element))) {
    //       yield return element;
    //     }
    //   }
    // }

    // list<(string hex, string name)>
    static  analogous(this hsl hsl, double delta, int count, domain domain = domain.fashion) {
    var cuvette = munsell.selectcuvette(domain);
    var (_, s, _) = hsl;
    var analogous = hsl
      .hslToPolar()
      .analogous(delta, count)
      .map(polar => cuvette.comparative(polar, s))
      .distinctby(kv => kv.hex).toList();
    return analogous;
  }

  // list<(string hex, string name)>
  static rhodoneaFolios(this (float h, float s, float l) rimmark,
    int petals,
    double density = 0.01,
    double lightminimum = 0,
    double saturtolerance = 18,
    domain domain = domain.fashion) {
    var cuvette = selectcuvette(domain);
    var polarmark = rimmark.hslToPolar();
    var hexToHsl = cuvette.hexToHsl.map(x => x); // create shallow copy
    var saturinterval = (rimmark.s - saturtolerance, rimmark.s + saturtolerance);
    var minl = (float)lightminimum;
    var area = pi * pow(polarmark.r, 2) * (petals % 2 == 0 ? 0.5 : 0.25);
    var maximum = (int)round(density * area);
    var thresholdperphase = maximum / petals;
    var petalnote = petalnote.build(polarmark.θ, petals);
    // console.writeline($">> [petalnote marks] {petalnote.marks.deco()}");
    var petalcache = enumerable.range(1, petals).todictionary(i => i, i => new sortedlist<float, string>());
    var sortedlist = new sortedlist<int, string>(maximum);
    int hslindicator((float h, float s, float l) hsl) => (int)hsl.h * 10000 + (int)hsl.s * 100 + (int)hsl.l;
    foreach (var (hex, hsl) in hexToHsl.finiteflopper()) {
      var (θ, s, r) = hsl;
      if (r < minl) continue;
      if (polarmark.foliateradius(θ, petals) < r) continue;
      var phase = petalnote.phase(θ);
      if (thresholdperphase <= petalnote.counter[phase]) continue;
      if (saturinterval.has(s)) {
        petalnote.notephase(phase);
        sortedlist.add(hslindicator(hsl), hex);
      }
      else {
        var ds = abs(rimmark.s - s);
        var dr = abs(rimmark.l - r);
        var dθ = pol.distance(rimmark.h, θ);
        petalcache[phase].add(ds * 100 + dr + dθ / 360, hex);
      }
      if (maximum <= petalnote.sum) break;
    }
    // console.writeline($">> [sortedlist.count] {sortedlist.count}");
    petalnote.counter.iterate(kv => {
      var phase = kv.key;
      var count = kv.value;
      if (count < thresholdperphase) {
        var cache = petalcache[phase];
        if (cache?.any() ?? false) {
          foreach (var hex in cache.values.take(thresholdperphase - count)) {
            sortedlist.add(hslindicator(conv.hexToHsl(hex)), hex);
          }
        }
      }
    });
    // console.writeline($">> [sortedlist.count] {sortedlist.count}");
    // console.writeline($">> [thresholdperphase] {thresholdperphase}");
    // petalnote.counter.entries().decoentries().says("petalnote");
    // petalcache.map((k, v) => (k, v.count)).toList().decoentries().says("petalcachenote");
    sortedlist.trimexcess();
    return sortedlist
      .values
      .select(hex => (hex, cuvette[hex]))
      .toList();
  }
}
}