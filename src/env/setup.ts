import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
	DATABASE_URL: z.url(),
	JWT_SECRET: z.string()
})

export const env = envSchema.parse(process.env)
