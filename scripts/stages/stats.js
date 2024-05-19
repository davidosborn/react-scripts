import path from 'node:path'

import bfj from 'bfj'

import paths from '../config/paths.js'
import colors from '../colors.js'

export default async function stats(stats) {
	process.stdout.write('Logging... ')
	try {
		await bfj.write(
			path.join(paths.dist, 'bundle-stats.json'),
			stats.toJson())
		process.stdout.write(colors.success('Done\n'))
	}
	catch (err) {
		process.stdout.write(colors.error('Failed\n'))
		throw err
	}
}
