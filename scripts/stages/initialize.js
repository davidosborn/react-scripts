import process from 'node:process'

import getopt from '@davidosborn/getopt'

import colors from '../colors.js'
import environments from '../environments.js'

export default function initialize(options) {
	const args = getopt(process.argv.slice(2), {
		options: [
			{
				short: 'd',
				long: 'development',
				description: 'Target development.'
			},
			{
				short: 'h',
				long: 'help',
				description: 'Display this usage information.',
				callback: getopt.usage
			},
			{
				short: 'p',
				long: 'production',
				description: 'Target production.'
			},
			{
				short: 'v',
				long: 'verbose',
				description: 'Display detailed information.'
			},
			{
				short: 'w',
				long: 'werr',
				description: 'Treat warnings as errors.'
			}
		],
		usage: '[option]... [target]'
	})

	const target = args.sequence
		.map(x => x.option !== undefined
			? x.option.long
			: x.value)
		.findLast(x => environments.has(x))
		?? options.target

	process.stdout.write('Targeting ' + colors.info(target) + '.\n')

	return {
		development: target === environments.development,
		verbose: args.options.verbose,
		werr: args.options.werr
	}
}
