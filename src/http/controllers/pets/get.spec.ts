import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { makePetData } from '@/utils/test/factories/make-pet-data'
import { registerAndAuthenticate } from '@/utils/test/register-and-authenticate'
import { prisma } from '@/lib/prisma'

describe('Get Pet e2e', () => {
	beforeEach(async () => {
		app.ready()
	})

	afterEach(async () => {
		app.close()
	})

	const petData = makePetData()

	it('should be possible to get a pet', async () => {
		const { token } = await registerAndAuthenticate()
		await request(app.server)
			.post('/pets')
			.send(petData)
			.set('Authorization', `Bearer ${token}`)

		const pet = await prisma.pet.findFirst({
			where: {
				name: petData.name
			}
		})

		const id = pet?.id

		const response = await request(app.server)
			.get(`/pets/${id}`)
			.set('Authorization', `Bearer ${token}`)

		expect(response.statusCode).toEqual(200)
		expect(response.body.pet).toEqual(
			expect.objectContaining({ name: petData.name })
		)
	})
})
