import { says }    from '@spare/logger'
import { time }    from '@valjoux/timestamp-pretty'
import { Cuvette } from '../src/Cuvette'
import { Domain }  from '../src/Domain'

says['log-time'].attach(time)
says['cuvette'].asc.asc

const test = () => {
  'preparing' |> says['log-time']
  const cuvette = Cuvette.selectCuvette(Domain.fashion)

  'generating list' |> says['log-time']
  cuvette.list.length |> says['cuvette'].p('list.length')
  'generating list' |> says['log-time']
  cuvette.list.length |> says['cuvette'].p('list.length')

  'generating hexToRgb' |> says['log-time']
  cuvette.hexToRgb.length |> says['cuvette'].p('list.length')
  'generating hexToRgb' |> says['log-time']
  cuvette.hexToRgb.length |> says['cuvette'].p('list.length')

  'generating hexToHsl' |> says['log-time']
  cuvette.hexToHsl.length |> says['cuvette'].p('list.length')
  'generating hexToHsl' |> says['log-time']
  cuvette.hexToHsl.length |> says['cuvette'].p('list.length')

  'generating hexToPolar' |> says['log-time']
  cuvette.hexToPolar.length |> says['cuvette'].p('list.length')
  'generating hexToPolar' |> says['log-time']
  cuvette.hexToPolar.length |> says['cuvette'].p('list.length')
}

test()