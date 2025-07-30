import request from 'supertest'
import { makeOrgData } from './factories/make-org-data'
import { app } from '@/app'

export async function registerAndAuthenticate() {
	const orgData = makeOrgData()

	await request(app.server).post('/orgs').send(orgData)

	const response = await request(app.server).post('/session').send({
		email: orgData.email,
		password: orgData.password
	})

	const { token } = response.body

	return { token }
}
