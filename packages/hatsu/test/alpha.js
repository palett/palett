const Escapes = {
  simple: '\e',
  utf8oct: '\\033',
  utf8hex: '\x1b',
  unicode: '\u001b' //C/C++/Java/Python
}
const main = (esc = Escapes.unicode) => {
  let n
  for (let i = 0; i < 11; i++) {
    let arr = ''
    for (let j = 1; j < 11; j++) {
      n = i * 10 + j - 1
      if (n > 108) break
      arr += `${esc}[${n}m ${n.toString().padStart(3)}${esc}[m`
    }
    console.log(arr)
  }
}

main()
