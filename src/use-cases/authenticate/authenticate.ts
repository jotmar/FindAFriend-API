import { OrgRepository } from '@/repositories/org-repository'
import { Org } from '@prisma/client'
import { email } from 'zod'
import { InvalidCredentialsError } from '../@errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
	email: string
	password: string
}

interface AuthenticateUseCaseResponse {
	org: Org
}

export class AuthenticateUseCase {
	constructor(private orgRepository: OrgRepository) {}

	async use(
		data: AuthenticateUseCaseRequest
	): Promise<AuthenticateUseCaseResponse> {
		/* Check if org exists */

		const org = await this.orgRepository.findByEmail(data.email)

		if (!org) {
			throw new InvalidCredentialsError()
		}

		/* Check if the password matches */

		const isValidPassword = await compare(data.password, org.password_hash)

		if (!isValidPassword) {
			throw new InvalidCredentialsError()
		}

		return { org }
	}
}
