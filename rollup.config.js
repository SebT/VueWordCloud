import babel from 'rollup-plugin-babel';
import bundleWorker from 'rollup-plugin-bundle-worker';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default [{
	entry: './src/workers/boundWord.js',
	// treeshake: true,
	plugins: [
		resolve({
			jsnext: true
		}),
		babel({ 
			presets: [
				['es2015', { modules: false }],
				'stage-3'
			],
			plugins: [
				'transform-runtime',
				'external-helpers'
			],
			exclude: 'node_modules/**',
			externalHelpers: true,
			runtimeHelpers: true
		}),
		commonjs()
	],
	output: [
		{ file: 'dist/workers/boundWord.js', format: 'umd', name: 'vueWordCloud_boundWord'}
	]
}, {
	input: './src/VueWordCloud.js',
	// treeshake: true,
	plugins: [ 
		bundleWorker(),
		resolve({
			jsnext: true
		}),
		babel({ 
			presets: [
				['es2015', { modules: false }],
				'stage-3'
			],
			plugins: [
				'transform-runtime',
				'external-helpers'
			],
			exclude: 'node_modules/**',
			externalHelpers: true,
			runtimeHelpers: true
		}),
		commonjs()
	],
	globals: {
		vue: 'Vue'
	},
	output: [
		{ file: 'dist/VueWordCloud.umd.js', format: 'umd', name: 'vueWordCloud'}
	]
}];