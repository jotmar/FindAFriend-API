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

	it('should be possible to register', async () => {
		const response = await request(app.server).post('/orgs').send(orgData)

		expect(response.statusCode).toEqual(201)
		expect(response.body.org.id).toEqual(expect.any(String))
	})
})
