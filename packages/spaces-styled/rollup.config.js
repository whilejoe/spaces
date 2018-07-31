import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

const GLOBALS = {
  'styled-components': 'styled'
};

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      globals: GLOBALS
    },
    {
      file: pkg.module,
      format: 'es',
      globals: GLOBALS
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'Spaces',
      globals: GLOBALS
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: ['last 2 versions', 'safari >= 7']
            },
            modules: false
          }
        ],
        '@babel/preset-react'
      ],
      plugins: [['babel-plugin-styled-components', { transpileTemplateLiterals: true }]]
    })
  ],
  external: ['react', 'styled-components']
};
