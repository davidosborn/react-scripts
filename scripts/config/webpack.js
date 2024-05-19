import path from 'node:path'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

import paths from './paths.js'

function getStyleLoaders(options) {
	return [
		options.development && 'style-loader',
		!options.development && MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				importLoaders: options.sass ? 2 : 0,
				modules: {
					mode: options.modules
						? 'global'
						: 'icss'
				},
				sourceMap: true
			}
		},
		options.sass && {
			loader: 'resolve-url-loader',
			options: {
				root: paths.src,
				sourceMap: true
			}
		},
		options.sass && {
			loader: 'sass-loader',
			options: {
				sourceMap: true
			}
		}
	].filter(Boolean)
}

export default function configure(options) {
	return {
		bail: !options.development,
		devServer: {
			historyApiFallback: true
		},
		devtool: 'source-map',
		infrastructureLogging: {
			stream: options.loggingStream
		},
		mode: options.development
			? 'development'
			: 'production',
		module: {
			rules: [
				{
					test: /\.js$/,
					include: paths.src,
					resolve: {
						fullySpecified: false
					},
					use: {
						loader: 'babel-loader',
						options: {
							cacheCompression: false,
							cacheDirectory: true,
							compact: !options.development,
							plugins: [
								'react-refresh/babel'
							],
							presets: [
								'@babel/preset-react'
							]
						}
					}
				},
				{
					test: /\.css$/,
					exclude: /\.module.css$/,
					include: paths.src,
					use: getStyleLoaders(Object.assign({
						modules: false,
						sass: false
					}, options))
				},
				{
					test: /\.module.css$/,
					include: paths.src,
					use: getStyleLoaders(Object.assign({
						modules: true,
						sass: false
					}, options))
				},
				{
					test: /\.s[ac]ss$/,
					exclude: /\.module.s[ac]ss$/,
					include: paths.src,
					use: getStyleLoaders(Object.assign({
						modules: false,
						sass: true
					}, options))
				},
				{
					test: /\.module.s[ac]ss$/,
					include: paths.src,
					use: getStyleLoaders(Object.assign({
						modules: true,
						sass: true
					}, options))
				}
			]
		},
		output: {
			path: paths.dist,
			pathinfo: options.development,
			filename: options.development
				? 'bundle.js'
				: '[name].[contenthash:8].js',
			chunkFilename: options.development
				? '[name].chunk.js'
				: '[name].[contenthash:8].chunk.js'
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.join(paths.public, 'index.html')
			}),
			new MiniCssExtractPlugin(),
			options.development && new ReactRefreshWebpackPlugin()
		].filter(Boolean),
		resolve: {
			modules: [
				paths.src,
				paths.modules
			]
		},
		stats: options.verbose
			? 'verbose'
			: 'normal'
	}
}
