import { OrgRepository } from '@/repositories/org-repository'
import { Org } from '@prisma/client'
import { OrgAlreadyExistsError } from '../@errors/org-already-exists-error'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
	name: string
	description: string
	tel: string
	address: string
	city: string
	email: string
	password: string
}

interface RegisterUseCaseResponse {
	org: Org
}

export class RegisterUseCase {
	constructor(private orgRepository: OrgRepository) {}

	async use(data: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
		/* Check if org already exists */

		const checkOrg = await this.orgRepository.findByEmail(data.email)

		if (checkOrg) {
			throw new OrgAlreadyExistsError()
		}

		/* Hash the password */

		const password_hash = await hash(data.password, 6)

		/* Create Org */

		const org = await this.orgRepository.create({
			name: data.name,
			description: data.description,
			tel: data.tel,
			address: data.address,
			city: data.city,
			email: data.email,
			password_hash: password_hash
		})

		return { org }
	}
}
