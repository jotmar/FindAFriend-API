import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { env } from './env/setup'
import { petsRouter } from './http/controllers/pets/_router'
import { orgsRouter } from './http/controllers/orgs/_router'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

/* Error Handler */
/*  */

app.setErrorHandler(async (error, request, reply) => {
	console.error(error)

	return reply.status(500).send()
})

/* Plugins */
/*  */

app.register(fastifyJwt, {
	secret: env.JWT_SECRET
})

app.register(fastifyCookie)

/* Routers */
/*  */

app.register(petsRouter)

app.register(orgsRouter)
