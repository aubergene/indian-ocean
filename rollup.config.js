import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
    input: 'index.js',
    plugins: [
        json(),
        resolve({
            jsnext: true
        }),
        commonjs(),
        buble(),
        uglify({}, minify)
    ],
    external: ['fs-extra', 'path'],
    output: [
        { file: 'dist/indian-ocean.cjs.js', format: 'cjs' },
        { file: 'dist/indian-ocean.es.js', format: 'es' },
    ],
    sourcemap: true
};