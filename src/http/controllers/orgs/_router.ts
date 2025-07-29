import { FastifyInstance } from 'fastify'
import { register } from './register'

export function orgsRouter(app: FastifyInstance) {
	/* Register and Authentication */
	/*  */

	app.post('/orgs', register)
}
