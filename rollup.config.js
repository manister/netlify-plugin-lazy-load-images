import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import autoExternal from 'rollup-plugin-auto-external';
import { terser } from 'rollup-plugin-terser'

const extensions = [
  '.ts',
];

export default {
  input: './src/index.ts',


  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      babelHelpers: 'bundled',
      include: ['src/**/*'],
    }),
    autoExternal(),
    terser()
  ],

  output: {
    dir: 'dist',
    format: 'cjs'
  },
};