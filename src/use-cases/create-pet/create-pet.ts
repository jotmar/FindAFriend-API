import { PetRepository } from '@/repositories/pet-repository'
import { $Enums, Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
	name: string
	specie: string
	breed: string
	color: string
	size: $Enums.Size
	org_id: string
}

interface CreatePetUseCaseResponse {
	pet: Pet
}

export class CreatePetUseCase {
	constructor(private petRepository: PetRepository) {}

	async use(data: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
		const pet = await this.petRepository.create(data)

		return { pet }
	}
}
