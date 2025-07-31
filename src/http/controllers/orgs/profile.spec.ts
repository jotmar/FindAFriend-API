import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { makeOrgData } from '@/utils/test/factories/make-org-data'
import { registerAndAuthenticate } from '@/utils/test/register-and-authenticate'

describe('Profile e2e', () => {
	beforeEach(async () => {
		app.ready()
	})

	afterEach(async () => {
		app.close()
	})

	const orgData = makeOrgData()

	it('should be possible to get a org profile', async () => {
		const { token } = await registerAndAuthenticate()

		const response = await request(app.server)
			.get(`/profile`)
			.set('Authorization', `Bearer ${token}`)

		expect(response.statusCode).toEqual(200)
		expect(response.body.org).toEqual(
			expect.objectContaining({ name: expect.any(String) })
		)
	})
})
