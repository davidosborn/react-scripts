import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const root = path.resolve(__dirname, '../..')

const paths = {
	dist: 'dist',
	modules: 'node_modules',
	public: 'public',
	src: 'src'
}

// Resolve the paths.
for (const [key, value] of Object.entries(paths)) {
	paths[key] = path.resolve(root, value)
}

paths.root = root

export default paths
