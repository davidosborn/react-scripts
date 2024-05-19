import process from 'node:process'

import stages from './stages/index.js'
import environments from './environments.js'
import SuspendStream from './SuspendStream.js'

const options = stages.initialize({
	target: environments.development
})

options.loggingStream = new SuspendStream(process.stderr)

try {
	const config = stages.configure(options)

	await stages.start(config)
}
catch (err) {
	process.stderr.write(err.message + '\n')
}
finally {
	options.loggingStream.restore()
}
