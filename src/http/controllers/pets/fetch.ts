import { makeFetchPetsUseCase } from '@/use-cases/@factories/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
	const requestQuerySchema = z.object({
		city: z.string(),
		name: z.optional(z.string().nullable()),
		specie: z.optional(z.string().nullable()),
		breed: z.optional(z.string().nullable()),
		color: z.optional(z.string().nullable()),
		size: z.optional(z.enum(['LARGE', 'SMALL', 'MEDIUM']).nullable())
	})

	const { city, name, specie, breed, color, size } = requestQuerySchema.parse(
		request.query
	)

	try {
		const fetchPetsUseCase = makeFetchPetsUseCase()

		const { pets } = await fetchPetsUseCase.use({
			city,
			options: {
				name: name ? name : undefined,
				breed: breed ? breed : undefined,
				specie: specie ? specie : undefined,
				color: color ? color : undefined,
				size: size ? size : undefined
			}
		})

		return reply.status(200).send({ pets })
	} catch (error) {
		throw error
	}
}
