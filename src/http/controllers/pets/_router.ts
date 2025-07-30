import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { get } from './get'

export function petsRouter(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)

	/* Authenticated Only */
	/*  */

	app.post('/pets', create)

	app.get('/pets/:id', get)
}
