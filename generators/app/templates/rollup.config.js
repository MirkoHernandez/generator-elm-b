// rollup.config.js

import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/main-rollup.js',
    // rollup: require('rollup'),// rollup-stream compatibility
    format: 'iife',              // rollup-stream compatibility
    name:'foo',                  // rollup-stream compatibility
    output: {
	name: 'foo',
	file: 'dist/bundle.js',
	format: 'iife'
    },
    plugins: [
	postcss({extensiont:['.scss']}),
	resolve({
	    // pass custom options to the resolve plugin
	    customResolveOptions: {
		moduleDirectory: 'node_modules'
	    }
	}),
	commonjs({
	    include: 'node_modules/**',  // Default: undefined
	    exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
	    extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]
	    ignoreGlobal: false,  // Default: false
	    sourceMap: false,  // Default: true
	    namedExports: { './module.js': ['foo', 'bar' ] },  // Default: undefined
	    ignore: [ 'conditional-runtime-dependency' ]
	}),
	json({
	    // All JSON files will be parsed by default,
	    // but you can also specifically include/exclude files
	    include: 'node_modules/**',
	    preferConst: true, // Default: false
	    indent: '  ',
	    compact: true, // Default: false
	    namedExports: true // Default: true
	})
    ],
    // indicate which modules should be treated as external
    external: ['lodash']
};

