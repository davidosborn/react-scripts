import process from 'node:process'

import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import colors from '../colors.js'

export default async function(config) {
	process.stdout.write('Starting... ')
	try {
		const compiler = webpack(config)
		const webpackDevServerConfig = {...config.devServer}
		const server = new WebpackDevServer(webpackDevServerConfig, compiler)
		await server.start()
		process.stdout.write(colors.success('Done\n'))
	}
	catch (err) {
		process.stdout.write(colors.error('Failed\n'))
		throw err
	}
}
