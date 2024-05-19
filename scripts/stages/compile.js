import process from 'node:process'

import webpack from 'webpack'

import configure from '../config/webpack.js'
import colors from '../colors.js'

async function compile(config) {
	return new Promise(resolve => webpack(config, (err, stats) => resolve({err, stats})))
}

export default async function(config) {
	process.stdout.write('Compiling... ')
	try {
		const {err, stats} = await compile(config)
		if (err) {
			throw err
		}

		const succeeded = !(stats.hasErrors() || stats.hasWarnings() && options.werr)
		process.stdout.write(succeeded
			? colors.success('Done\n')
			: colors.error('Failed\n'))

		return stats
	}
	catch (err) {
		process.stdout.write(colors.error('Failed\n'))
		throw err
	}
}
