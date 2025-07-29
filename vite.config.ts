import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		projects: [
			{
				extends: true,
				test: {
					name: 'unit',
					dir: './src/use-cases/',
					environment: 'node'
				}
			},
			{
				extends: true,
				test: {
					name: 'e2e',
					dir: './src/http/controllers/',
					environment: './prisma/prisma-test-environment/setup.ts'
				}
			}
		]
	}
})
