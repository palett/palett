import { makeEmbedded }      from '@foba/util'
import { decoCrostab, says } from '@spare/logger'
import { strategies }        from '@valjoux/strategies'
import { mapKeys }           from '@vect/object'
import { hexToInt }          from '../../src/hexToRgi'
import { diluteHex }         from '../../utils/hex'
import { NameMapper }        from '../resources/NAME_MAPPING'
import { NORMAL, PRIMARY }   from '../resources/NORD'

const { lapse, result } = strategies({
  repeat: 5E+6,
  candidates: {
    ...mapKeys(PRIMARY, NameMapper('primary', 14)),
    ...mapKeys(NORMAL, NameMapper('normal', 14))
  } |> makeEmbedded,
  methods: {
    bench: v => v,
    blessed(hex) {
      if (hex.length === 4) {
        const [ sharp, r, g, b ] = hex
        hex = sharp + r + r + g + g + b + b
      }
      return parseInt(hex.slice(1), 16)
    },
    dev(hex) {
      if (hex.charAt(0) === '#') hex = hex.slice(1)
      if (!hex[3]) hex = diluteHex(hex)
      return parseInt(hex, 16)
    },
    edg(hex) {
      function hexAt(tx, i) {
        const n = tx.codePointAt(i)
        if (n <= 48) return 0
        if (n <= 57) return n - 48
        if (64 < n && n <= 70) return n - 55
        if (96 < n && n <= 102) return n - 87
        return 0
      }
      let n
      if (hex.length === 4) {
        const r = ( ( n = hexAt(hex, 1) ) << 4 ) | n
        const g = ( ( n = hexAt(hex, 2) ) << 4 ) | n
        const b = ( ( n = hexAt(hex, 3) ) << 4 ) | n
        return r << 16 | g << 8 | b
      }
      if (hex.length === 7) {
        const r = ( hexAt(hex, 1) << 4 ) | hexAt(hex, 2)
        const g = ( hexAt(hex, 3) << 4 ) | hexAt(hex, 4)
        const b = ( hexAt(hex, 5) << 4 ) | hexAt(hex, 6)
        return r << 16 | g << 8 | b
      }
      return 0
    },
    fut(hex) {
      function hexAt(tx, i) {
        let n = tx.charCodeAt(i)
        return ( n >> 5 ) <= 1 ? n & 0xf : ( n & 0x7 ) + 9
      }
      let n
      if (hex.length === 4) {
        const r = ( ( n = hexAt(hex, 1) ) << 4 ) | n
        const g = ( ( n = hexAt(hex, 2) ) << 4 ) | n
        const b = ( ( n = hexAt(hex, 3) ) << 4 ) | n
        return r << 16 | g << 8 | b
      }
      if (hex.length === 7) {
        const r = ( hexAt(hex, 1) << 4 ) | hexAt(hex, 2)
        const g = ( hexAt(hex, 3) << 4 ) | hexAt(hex, 4)
        const b = ( hexAt(hex, 5) << 4 ) | hexAt(hex, 6)
        return r << 16 | g << 8 | b
      }
      return 0
    },
    hexToInt,
  }
  // cla, dev, edg, rea, arc, epi
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']

