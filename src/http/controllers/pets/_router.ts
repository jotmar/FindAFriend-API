import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verifyJWT'

export function petsRouter(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)

	/* Authenticated Only */
	/*  */

	app.post('/pets', create)
}
