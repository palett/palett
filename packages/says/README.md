## says
### A light and simple debug tool.

<p align="center">
  <a href="https://npmcharts.com/compare/says?minimal=true"><img src="https://img.shields.io/npm/dm/says.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/says"><img src="https://img.shields.io/npm/v/says.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/says"><img src="https://img.shields.io/npm/l/says.svg" alt="License"></a>
</p>

## Highlights

- A debug tool.

## Install

```console
$ npm install says
```

## Usage

### Simple
```js
import { Says } from '@palett/says'
import { greys, palette } from 'spettro'

const castList = {
  client: palette.Red.base,
  server: palette.Purple.base,
  stranger: greys.Grey.base
}

const debug = Says.build(castList)

debug.says('client', '\'Shakespeare\'')
debug.says('server', '\'Dickens\'')
```

### Factorial with pipeline operator
```js
import { Says } from '@palett/says'
import { greys, palette } from 'spettro'

const castList = {
  client: palette.Red.base,
  server: palette.Purple.base,
  stranger: greys.Grey.base
}

const debug = Says.build(castList)
const says = {
  client: debug.credit('chef'),
  server: debug.credit('aboyeur')
}
'Shakespeare' |> says.client
'Dickens' |> says.server
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Haoyang (Vincent) Wang
