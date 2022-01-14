import babel          from '@rollup/plugin-babel'
import commonjs       from '@rollup/plugin-commonjs'
import json           from '@rollup/plugin-json'
import nodeResolve    from '@rollup/plugin-node-resolve'
// import { decoObject } from '@spare/logger'
// import fileInfo       from 'rollup-plugin-fileinfo'

const { name, dependencies, main, module } = require(process.cwd() + '/package.json')

console.log('Executing', name, process.cwd())
// console.log('Dependencies', decoObject(dependencies ?? {}))

export default [
  {
    input: 'index.js',
    external: Object.keys(dependencies ?? {}),
    output: [
      { file: main, format: 'cjs' },  // CommonJS (for Node) build.
      { file: module, format: 'esm' }  // ES module (for bundlers) build.
    ],
    plugins: [
      nodeResolve({ preferBuiltins: true }),
      commonjs({ include: /node_modules/ }),
      babel({
        babelrc: false,
        comments: true,
        sourceMap: true,
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: [
          [ '@babel/preset-env', { targets: { node: '16' } } ]
        ],
        plugins: [
          [ '@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' } ],
        ]
      }),
      json(),
      // fileInfo(),
    ]
  }
]
