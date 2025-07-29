import { makeRegisterUseCase } from '@/use-cases/@factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z, { email } from 'zod'
import { orgsRouter } from './_router'
import { OrgAlreadyExistsError } from '@/use-cases/@errors/org-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const requestBodySchema = z.object({
		name: z.string(),
		description: z.string(),
		tel: z.string(),
		email: z.email(),
		password: z.string(),
		city: z.string(),
		address: z.string()
	})

	const { name, description, tel, email, password, city, address } =
		requestBodySchema.parse(request.body)

	try {
		const registerUseCase = makeRegisterUseCase()

		const { org } = await registerUseCase.use({
			name,
			description,
			tel,
			email,
			password,
			city,
			address
		})

		return reply.status(201).send({ org })
	} catch (error) {
		if (error instanceof OrgAlreadyExistsError) {
			return reply.status(409).send({ message: error.message })
		}
		throw error
	}
}
