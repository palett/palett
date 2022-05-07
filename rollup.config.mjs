import { babel }                  from '@rollup/plugin-babel'
import json                       from '@rollup/plugin-json'
import { nodeResolve }            from '@rollup/plugin-node-resolve'
// import { decoObject, decoString } from '@spare/logger'
import { readFileSync }           from 'fs'
// import { fileInfo }               from 'rollup-plugin-fileinfo'

const packageJson = readFileSync(process.cwd() + '/package.json', { encoding: 'utf-8' })
const { name, dependencies, exports } = JSON.parse(packageJson)

// console.log('Executing', name, decoString(process.cwd()))
// console.log('Dependencies', decoObject(dependencies || {}))

export default {
  input: 'index.js',
  external: Object.keys(dependencies || {}),
  output: [
    { file: exports['import'], format: 'esm' },  // CommonJS (for Node) build.
    { file: exports['require'], format: 'cjs' }  // ES module (for bundlers) build.
  ],
  plugins: [
    nodeResolve({ preferBuiltins: true }),
    babel({
      babelrc: false,
      comments: true,
      sourceMap: true,
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
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

