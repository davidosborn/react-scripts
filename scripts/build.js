import process from 'node:process'

import colors from './colors.js'
import stages from './stages/index.js'
import environments from './environments.js'
import SuspendStream from './SuspendStream.js'

const options = stages.initialize({
	target: environments.production
})

options.loggingStream = new SuspendStream(process.stderr)

try {
	const config = stages.configure(options)

	const stats = await stages.compile(config)

	await stages.stats(stats)

	options.loggingStream.restore()

	if (!stats.hasErrors() || stats.hasWarnings() && options.werr) {
		process.stdout.write(colors.warning('Treating warnings as errors.\n'))
	}

	process.stdout.write(stats.toString({
		chunks: false,
		colors: true
	}) + '\n')
}
catch (err) {
	process.stderr.write(err.message + '\n')
}
finally {
	options.loggingStream.restore()
}
