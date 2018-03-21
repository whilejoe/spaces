import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/spaces-styled.js',
    format: 'es',
    globals: {
      'styled-components': 'styled',
    },
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  external: ['styled-components'],
};
