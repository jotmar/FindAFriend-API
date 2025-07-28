import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory-repository/in-memory-pet-repository'
import { PetRepository } from '@/repositories/pet-repository'
import { CreatePetUseCase } from './create-pet'
import { makePetData } from '@/utils/test/factories/make-pet-data'

describe('Register UseCase Unit', () => {
	let sut: CreatePetUseCase
	let petRepository: PetRepository

	beforeEach(() => {
		petRepository = new InMemoryPetRepository()
		sut = new CreatePetUseCase(petRepository)
	})

	const petData = makePetData()

	it('should be possible to create a pet', async () => {
		const { pet } = await sut.use(petData)

		expect(pet.id).toEqual(expect.any(String))
	})
})
