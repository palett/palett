
  // (string hex, string name)
  export function nearest(this hsl hsl, domain domain = domain.fashion) {
    var cuvette = munsell.selectcuvette(domain);
    var (hex, _) = cuvette.hexToHsl.minby(kv => distance(hsl, kv.hsl));
    return (hex, cuvette[hex]);
  }

  // list<(string hex, string name)>
  export function   search(string name, domain domain = domain.fashion) {
    var regex = new regex(name, regexoptions.ignorecase);
    var cuvette = munsell.selectcuvette(domain);
    return cuvette.list
      .findall(kv => regex.ismatch(kv.val));
  }
