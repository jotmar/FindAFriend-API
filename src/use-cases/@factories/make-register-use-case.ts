import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { RegisterUseCase } from '../register/register'

export function makeRegisterUseCase() {
	const orgRepository = new PrismaOrgRepository()
	const registerUseCase = new RegisterUseCase(orgRepository)

	return registerUseCase
}
