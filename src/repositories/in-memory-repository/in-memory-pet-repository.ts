import { $Enums, Prisma, Pet } from '@prisma/client'
import { PetRepository } from '../pet-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetRepository implements PetRepository {
	public items: Pet[] = []
	async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
		const pet = {
			id: randomUUID(),
			name: data.name,
			specie: data.specie,
			breed: data.breed,
			color: data.color,
			size: data.size,
			org_id: data.org_id
		}

		this.items.push(pet)

		return pet
	}
}
