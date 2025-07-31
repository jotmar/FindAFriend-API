import { ResourceNotFoundError } from '@/use-cases/@errors/resource-not-found-error'
import { makeProfileUseCase } from '@/use-cases/@factories/make-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
	const id = request.user.sub

	try {
		const profileUseCase = makeProfileUseCase()

		const { org } = await profileUseCase.use({
			id
		})

		return reply.status(200).send({ org })
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: error.message })
		}
		throw error
	}
}
