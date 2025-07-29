import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { AuthenticateUseCase } from '../authenticate/authenticate'

export function makeAuthenticateUseCase() {
	const orgRepository = new PrismaOrgRepository()
	const useCase = new AuthenticateUseCase(orgRepository)

	return useCase
}
