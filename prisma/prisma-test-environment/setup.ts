import 'dotenv/config'
import { prisma } from '@/lib/prisma'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/environments'

function generateUrl(schema: string) {
	if (!process.env.DATABASE_URL) {
		throw new Error('Invalid DATABASE_URL Variable')
	}

	const newUrl = String(process.env.DATABASE_URL).replace('public', schema)

	return String(newUrl)
}

generateUrl(randomUUID())

export default <Environment>{
	name: 'prisma',
	transformMode: 'ssr',
	async setup() {
		const schema = randomUUID()
		const genereatedUrl = generateUrl(schema)

		process.env.DATABASE_URL = genereatedUrl

		execSync('npx prisma db push')
		return {
			async teardown() {
				await prisma.$executeRawUnsafe(
					`DROP SCHEMA IF EXISTS "${schema}" CASCADE`
				)

				await prisma.$disconnect()
			}
		}
	}
}
