import { GetPetUseCase } from '../get-pet/get-pet'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'

export function makeGetPetUseCase() {
	const petRepository = new PrismaPetRepository()
	const useCase = new GetPetUseCase(petRepository)

	return useCase
}
