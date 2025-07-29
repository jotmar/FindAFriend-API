import { $Enums, Prisma, Pet } from '@prisma/client'
import { PetOptions, PetRepository } from '../pet-repository'
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

	async fetchByOrg(orgId: string, options?: PetOptions): Promise<Pet[]> {
		let pets = this.items.filter(item => item.org_id == orgId)

		if (options && Object.keys(options).length != 0) {
			pets = options.name
				? this.items.filter(item => item.name === options.name)
				: pets
			pets = options.breed
				? this.items.filter(item => item.breed === options.breed)
				: pets
			pets = options.specie
				? this.items.filter(item => item.specie === options.specie)
				: pets
			pets = options.color
				? this.items.filter(item => item.color === options.color)
				: pets
			pets = options.size
				? this.items.filter(item => item.size === options.size)
				: pets
		}

		return pets
	}
}
