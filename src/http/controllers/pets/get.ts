import { ResourceNotFoundError } from '@/use-cases/@errors/resource-not-found-error'
import { makeGetPetUseCase } from '@/use-cases/@factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {
	const requestParamSchema = z.object({
		id: z.uuid()
	})

	const { id } = requestParamSchema.parse(request.params)

	try {
		const getPetUseCase = makeGetPetUseCase()

		const { pet } = await getPetUseCase.use({
			id
		})

		return reply.status(200).send({ pet })
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: error.message })
		}
		throw error
	}
}
