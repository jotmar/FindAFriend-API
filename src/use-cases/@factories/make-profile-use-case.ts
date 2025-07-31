import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { ProfileUseCase } from '../profile/profile'

export function makeProfileUseCase() {
	const orgRepository = new PrismaOrgRepository()
	const useCase = new ProfileUseCase(orgRepository)

	return useCase
}
