import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { makePetData } from '@/utils/test/factories/make-pet-data'
import { registerAndAuthenticate } from '@/utils/test/register-and-authenticate'
import { makeOrgData } from '@/utils/test/factories/make-org-data'

describe('Fetch Pets e2e', () => {
	beforeEach(async () => {
		app.ready()
	})

	afterEach(async () => {
		app.close()
	})

	const petData = makePetData()

	it('should be able to fetch pets', async () => {
		const { token, city } = await registerAndAuthenticate()

		for (let i = 0; i < 3; i++) {
			await request(app.server)
				.post('/pets')
				.send(petData)
				.set('Authorization', `Bearer ${token}`)
		}

		const response = await request(app.server)
			.get('/pets')
			.query({
				city
			})
			.set('Authorization', `Bearer ${token}`)

		expect(response.statusCode).toEqual(200)
		expect(response.body.pets).toHaveLength(3)
	})
})
