import { OrgRepository } from '@/repositories/org-repository'
import { PetOptions, PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

interface FetchPetsUseCaseRequest {
	city: string
	options?: PetOptions
}

interface FetchPetsUseCaseResponse {
	pets: Pet[]
}

export class FetchPetsUseCase {
	constructor(
		private orgRepository: OrgRepository,
		private petRepository: PetRepository
	) {}

	async use(data: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
		const orgs = await this.orgRepository.findByCity(data.city)
		let pets: Pet[] = []
		for (let org of orgs) {
			const fetchedPets = await this.petRepository.fetchByOrg(
				org.id,
				data.options
			)
			pets = [...pets, ...fetchedPets]
		}

		return { pets }
	}
}
