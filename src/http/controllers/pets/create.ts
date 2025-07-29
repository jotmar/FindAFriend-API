import { makeCreatePetUseCase } from '@/use-cases/@factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const requestBodySchema = z.object({
		name: z.string(),
		specie: z.string(),
		breed: z.string(),
		color: z.string(),
		size: z.enum(['SMALL', 'MEDIUM', 'LARGE'])
	})

	const { name, specie, breed, color, size } = requestBodySchema.parse(
		request.body
	)

	const orgId = request.user.sub

	try {
		const createPetUseCase = makeCreatePetUseCase()

		await createPetUseCase.use({
			org_id: orgId,
			name,
			specie,
			breed,
			color,
			size
		})

		return reply.status(201).send()
	} catch (error) {
		throw error
	}
}
