import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { FetchPetsUseCase } from '../fetch-pets/fetch-pets'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'

export function makeFetchPetsUseCase() {
	const orgRepository = new PrismaOrgRepository()
	const petRepository = new PrismaPetRepository()
	const useCase = new FetchPetsUseCase(orgRepository, petRepository)

	return useCase
}
