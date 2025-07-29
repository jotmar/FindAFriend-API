import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory-repository/in-memory-pet-repository'
import { PetRepository } from '@/repositories/pet-repository'
import { makePetData } from '@/utils/test/factories/make-pet-data'
import { GetPetUseCase } from './get-pet'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'

describe('GetPet UseCase Unit', () => {
	let sut: GetPetUseCase
	let petRepository: PetRepository

	beforeEach(() => {
		petRepository = new InMemoryPetRepository()
		sut = new GetPetUseCase(petRepository)
	})

	const petData = makePetData()

	it('should be possible to get a pet data', async () => {
		const createdPet = await petRepository.create(petData)

		const { pet } = await sut.use({
			id: createdPet.id
		})

		expect(pet.id).toEqual(expect.any(String))
	})

	it('should not be possible to get a pet data with invalid id', async () => {
		await expect(async () => {
			const { pet } = await sut.use({
				id: 'inexistent-id'
			})
		}).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
