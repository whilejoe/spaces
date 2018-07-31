import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/spaces-styled.js',
    format: 'esm',
    globals: {
      'styled-components': 'styled'
    }
  },
  plugins: [
    resolve(),
    // commonjs(),
    babel({
      babelrc: false,
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-react',
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: ['last 2 versions', 'safari >= 7']
            },
            modules: false
          }
        ]
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            useESModules: true,
            useBuiltIns: true
            // helpers: false,
            // polyfill: false
          }
        ],
        ['babel-plugin-styled-components', { transpileTemplateLiterals: true }]
      ]
    })
  ],
  external: ['@babel/runtime', '@babel/runtime/regenerator', 'react', 'styled-components']
};
