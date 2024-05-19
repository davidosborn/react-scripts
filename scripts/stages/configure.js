import process from 'node:process'

import configure from '../config/webpack.js'
import colors from '../colors.js'

export default function(options) {
	process.stdout.write('Configuring... ')
	try {
		const config = configure(options)
		process.stdout.write(colors.success('Done\n'))
		return config
	}
	catch (err) {
		process.stdout.write(colors.error('Failed\n'))
		throw err
	}
}
