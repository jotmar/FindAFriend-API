import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { makeOrgData } from '@/utils/test/factories/make-org-data'

describe('Register e2e', () => {
	beforeEach(async () => {
		app.ready()
	})

	afterEach(async () => {
		app.close()
	})

	const orgData = makeOrgData()

	it('should be possible to authenticate', async () => {
		await request(app.server).post('/orgs').send(orgData)

		const response = await request(app.server).post('/session').send({
			email: orgData.email,
			password: orgData.password
		})

		expect(response.statusCode).toEqual(200)
		expect(response.body).toEqual(
			expect.objectContaining({ token: expect.any(String) })
		)
	})
})
