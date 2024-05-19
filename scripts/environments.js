const environments = new Set([
	'development',
	'production'
])

// Add the keys as properties.
for (const environment of environments) {
	environments[environment] = environment
}

export default environments
