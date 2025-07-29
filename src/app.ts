import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { env } from './env/setup'
import { petsRouter } from './http/controllers/pets/_router'
import { orgsRouter } from './http/controllers/orgs/_router'

export const app = fastify()

/* Plugins */
/*  */

app.register(fastifyJwt, {
	secret: env.JWT_SECRET
})

/* Routers */
/*  */

app.register(petsRouter)

app.register(orgsRouter)
