import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'

export function orgsRouter(app: FastifyInstance) {
	/* Register and Authentication */
	/*  */

	app.post('/orgs', register)

	app.post('/session', authenticate)
}
