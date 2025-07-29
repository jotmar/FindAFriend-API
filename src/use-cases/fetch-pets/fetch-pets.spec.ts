import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory-repository/in-memory-pet-repository'
import { PetRepository } from '@/repositories/pet-repository'
import { makePetData } from '@/utils/test/factories/make-pet-data'
import { FetchPetsUseCase } from './fetch-pets'
import { InMemoryOrgRepository } from '@/repositories/in-memory-repository/in-memory-org-repository'
import { OrgRepository } from '@/repositories/org-repository'
import { makeOrgData } from '@/utils/test/factories/make-org-data'
import { Org } from '@prisma/client'

describe('Fetch-Pets UseCase Unit', () => {
	let sut: FetchPetsUseCase
	let orgRepository: OrgRepository
	let petRepository: PetRepository
	let org: Org
	const petData = makePetData()
	const orgData = makeOrgData()

	beforeEach(async () => {
		orgRepository = new InMemoryOrgRepository()
		petRepository = new InMemoryPetRepository()
		sut = new FetchPetsUseCase(orgRepository, petRepository)
		org = await orgRepository.create(orgData)
		petData.org_id = org.id
	})

	it('should be possible to fetch pets', async () => {
		for (let i = 0; i < 3; i++) {
			await petRepository.create(petData)
		}

		const { pets } = await sut.use({
			city: org.city
		})

		expect(pets).toHaveLength(3)
		expect(pets).toEqual([
			expect.objectContaining({ name: petData.name }),
			expect.objectContaining({ name: petData.name }),
			expect.objectContaining({ name: petData.name })
		])
	})

	it('should be possible to fetch pets by caracteristics', async () => {
		await petRepository.create(petData)
		petData.color = 'test-color'
		await petRepository.create(petData)

		const { pets } = await sut.use({
			city: org.city,
			options: {
				color: 'test-color'
			}
		})

		expect(pets).toHaveLength(1)
		expect(pets).toEqual([expect.objectContaining({ color: 'test-color' })])
	})
})
