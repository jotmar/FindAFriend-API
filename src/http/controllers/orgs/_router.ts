import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { profile } from './profile'

export function orgsRouter(app: FastifyInstance) {
	/* Register and Authentication */
	/*  */

	app.post('/orgs', register)

	app.post('/session', authenticate)

	/* Authenticated Only */
	/*  */

	app.get('/profile', { onRequest: [verifyJWT] }, profile)
}
