import { env } from '@/env/setup'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import z, { ZodError } from 'zod'

export async function FastifyErrorHandler(
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply
) {
	if (error instanceof ZodError) {
		return reply.status(409).send({ message: z.treeifyError(error) })
	}

	if (env.NODE_ENV != 'prod') {
		console.error(error)
	}

	return reply.status(500).send({ message: 'Internal Server Error' })
}
