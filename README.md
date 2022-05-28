##@palett

##### :kimono: Colorify in console, utilize ansi.

[![github commit last][badge-github-last-commit]][url-github]
[![github commit total][badge-github-commit-count]][url-github]

[//]: <> (Shields)
[badge-github-last-commit]: https://flat.badgen.net/github/last-commit/hoyeungw/palett
[badge-github-commit-count]: https://flat.badgen.net/github/commits/hoyeungw/palett

[//]: <> (Link)
[url-github]: https://github.com/hoyeungw/palett

## Features

- Lightweight and fast color convert among RGB, HEX and HSL (@palett/convert).
- Colorant to array, 2d-array, entries for console output(@palett/fluoMatrix).
- Color presets to visualize numeric or string array.(@palett/presets)
- Colored debug loggers, functional declaring & use out-of-box. (@palett/says).
- Palett color cards (@palett/cards).
- Chalk-styled color narrate.(@palett/hatsu)
- ES-module support.

## Install

```console
$ npm install @palett/<tool-name>
```

## Tools

|                                                 |                                      |           |
|-------------------------------------------------|--------------------------------------|-----------|
| [**convert**](packages/convert)                 | Convert RGB, HEX or HSL              | util      |
| [**cards**](packages/cards)                     | Palett color cards                   | constants |
| [**presets**](packages/presets)                 | Color presets for 'fluoMatrix'       | constants |
| [**table**](packages/table)                     | Demo palett color table in console   | constants |
| [**dye**](packages/dye)                         | Colorify string (by ANSI rule)       | colorant  |
| [**says**](archive/says)                       | Colored narrate creator              | colorant  |
| [**hatsu**](archive/hatsu)                      | Chalk-style color string             | colorant  |
| [**fluoMatrix**](packages/fluo)                 | Index for submodules of 'fluoMatrix' | colorant  |
| [**fluoMatrix-vector**](packages/fluo-vector)   | Color array                          | colorant  |
| [**fluoMatrix-matrix**](packages/fluo-matrix)   | Color 2d-array                       | colorant  |
| [**fluoMatrix-entries**](packages/fluo-entries) | Color entries                        | colorant  |
|                                                 |                                      |           |

### Unpublished packages
- @palett/ros
- @palett/hatsu
- @palett/buff

## Meta
[LICENSE (MIT)](LICENSE)
