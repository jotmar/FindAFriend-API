import { Prisma, Pet } from '@prisma/client'
import { PetOptions, PetRepository } from '../pet-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetRepository implements PetRepository {
	items: Pet[] = []

	async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
		const pet = await prisma.pet.create({
			data
		})

		return pet
	}

	async fetchByOrg(orgId: string, options?: PetOptions): Promise<Pet[]> {
		const pets = await prisma.pet.findMany({
			where: {
				org_id: orgId,
				name: options?.name,
				specie: options?.specie,
				breed: options?.breed,
				color: options?.color,
				size: options?.size
			}
		})

		return pets
	}

	async findById(id: string): Promise<Pet | null> {
		const pet = await prisma.pet.findUnique({
			where: {
				id
			}
		})

		return pet
	}
}
