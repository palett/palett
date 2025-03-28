import { makeEmbedded }      from '@foba/util'
import { decoCrostab, says } from '@spare/logger'
import { strategies }        from '@valjoux/strategies'
import { mapKeys }           from '@vect/object'
import { diluteHex }         from '../../utils/hex.js'
import { NameMapper }        from '../resources/NAME_MAPPING.js'
import { NORMAL, PRIMARY }   from '../resources/NORD.js'

const { lapse, result } = strategies({
  repeat: 5E+6,
  candidates: {
    ...mapKeys(PRIMARY, NameMapper('primary', 14)),
    ...mapKeys(NORMAL, NameMapper('normal', 14)),
  } |> makeEmbedded,
  methods: {
    bench: v => v,
    blessed(hex) {
      if (hex.length === 4) {
        const [ sharp, r, g, b ] = hex
        hex = sharp + r + r + g + g + b + b
      }
      const n = parseInt(hex.slice(1), 16)
      return [ (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff ]
    },
    dev(hex) {
      if (hex.charAt(0) === '#') hex = hex.slice(1)
      if (!hex[3]) hex = diluteHex(hex)
      const n = parseInt(hex, 16)
      return [ (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff ]
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
        const r = (n = hexAt(hex, 1)) << 4 | n
        const g = (n = hexAt(hex, 2)) << 4 | n
        const b = (n = hexAt(hex, 3)) << 4 | n
        return [ r, g, b ]
      }
      if (hex.length === 7) {
        const r = hexAt(hex, 1) << 4 | hexAt(hex, 2)
        const g = hexAt(hex, 3) << 4 | hexAt(hex, 4)
        const b = hexAt(hex, 5) << 4 | hexAt(hex, 6)
        return [ r, g, b ]
      }
      return [ 0, 0, 0 ]
    },
    fut(hex) {
      function hexAt(tx, i) {
        let n = tx.codePointAt(i)
        const seg = n >> 5
        return seg <= 1 ? n & 0xf : (n & 0x7) + 9
      }
      let n
      if (hex.length === 4) {
        const r = (n = hexAt(hex, 1)) << 4 | n
        const g = (n = hexAt(hex, 2)) << 4 | n
        const b = (n = hexAt(hex, 3)) << 4 | n
        return [ r, g, b ]
      }
      if (hex.length === 7) {
        const r = hexAt(hex, 1) << 4 | hexAt(hex, 2)
        const g = hexAt(hex, 3) << 4 | hexAt(hex, 4)
        const b = hexAt(hex, 5) << 4 | hexAt(hex, 6)
        return [ r, g, b ]
      }
      return [ 0, 0, 0 ]
    },
  },
  // cla, dev, edg, rea, arc, epi
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']

