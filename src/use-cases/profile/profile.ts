import { OrgRepository } from '@/repositories/org-repository'
import { Org } from '@prisma/client'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'

interface ProfileUseCaseRequest {
	id: string
}

interface ProfileUseCaseResponse {
	org: Org
}

export class ProfileUseCase {
	constructor(private orgRepository: OrgRepository) {}

	async use(data: ProfileUseCaseRequest): Promise<ProfileUseCaseResponse> {
		const org = await this.orgRepository.findById(data.id)

		if (!org) {
			throw new ResourceNotFoundError()
		}

		return { org }
	}
}
