import { decoCrostab, says } from '@spare/logger'
import { strategies }        from '@valjoux/strategies'
import { CSI, SGR }          from '../lib/constants.js'
import { Morisot }           from '../lib/morisot.js'
import { BOLD, UNDERLINE }   from '../lib/styles.js'
import { ofStyle }           from '../lib/toStyle.js'
import { Vonnoh }            from '../lib/vonnoh.js'

const Global = {
  source: Morisot.presetToCode({ fore: null, back: null, style: ofStyle(BOLD) }),
  normal: Morisot.presetToCode({ fore: null, back: null, style: ofStyle(BOLD, UNDERLINE) }),
}

const RESET = CSI + 0 + SGR
const { lapse, result } = strategies({
  repeat: 2E+5,
  candidates: {
    foo: [ CSI + SGR, Global.source, Global.normal ],
    bar: [ CSI + '38;2;127;127;127' + SGR, Global.source, Global.normal ],
    kha: [ CSI + '38;5;189;48;5;248' + SGR, Global.source, Global.normal ],
    zen: [ CSI + '38;2;95;255;255;48;2;127;127;127' + SGR, Global.source, Global.normal ],
  },
  methods: {
    bench: (target, source, normal) => [ target + 'some' + RESET, target.replace(/[\x1b]/gi, 'ESC'), source, normal ],
    cla: Morisot.attrCode,
    dev: Vonnoh.sgrcToCode,
    // arc: x => x,
    // rea: x => x,
    // fut: x => x,
  },
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']