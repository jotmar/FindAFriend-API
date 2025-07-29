import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'

interface GetPetUseCaseRequest {
	id: string
}

interface GetPetUseCaseResponse {
	pet: Pet
}

export class GetPetUseCase {
	constructor(private petRepository: PetRepository) {}

	async use(data: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
		const pet = await this.petRepository.findById(data.id)

		if (!pet) {
			throw new ResourceNotFoundError()
		}

		return { pet }
	}
}
