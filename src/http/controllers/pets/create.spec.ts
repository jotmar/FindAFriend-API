import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { makePetData } from '@/utils/test/factories/make-pet-data'
import { registerAndAuthenticate } from '@/utils/test/register-and-authenticate'

describe('Create e2e', () => {
	beforeEach(async () => {
		app.ready()
	})

	afterEach(async () => {
		app.close()
	})

	const petData = makePetData()

	it('should be possible to create a pet', async () => {
		const { token } = await registerAndAuthenticate()
		const response = await request(app.server)
			.post('/pets')
			.send(petData)
			.set('Authorization', `Bearer ${token}`)

		expect(response.statusCode).toEqual(201)
	})
})
