import { Says } from '../index'
import { castList } from './assets/Bistro'
import { greys, palette } from 'spettro'

export const castList = {
  client: palette.red.base,
  server: palette.purple.base,
  aboyeur: palette.amber.accent_4,
  chef: palette.blue.accent_2,
  vendor: palette.lime.accent_4,
  tournant: palette.yellow.accent_3,
  bistro: palette.lightBlue.accent_2,
  stranger: greys.grey.base
}

export const factoryTest = () => {
  const says = Says.build(castList)

  const says1 = {
    chef: says.credit('chef'),
    aboyeur: says.credit('aboyeur')
  }

  const says2 = says.batchCredit(['vendor', { indent: 1 }], 'bistro', 'someone-else')
  'Shakespeare' |> says.chef
  'Dickens' |> says.aboyeur
  'Vendor' |> says2.vendor
  'Bistro' |> says2.bistro
}


