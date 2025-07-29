import { FastifyInstance } from 'fastify'
import { create } from './create'

export function petsRouter(app: FastifyInstance) {
	/* Authenticated Only */
	/*  */

	app.post('/pets', create)
}
