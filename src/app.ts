import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { env } from './env/setup'
import { petsRouter } from './http/controllers/pets/_router'
import { orgsRouter } from './http/controllers/orgs/_router'
import fastifyCookie from '@fastify/cookie'
import { FastifyErrorHandler } from './lib/fastify/error-handler'

export const app = fastify()

/* Error Handler */
/*  */

app.setErrorHandler(FastifyErrorHandler)

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
