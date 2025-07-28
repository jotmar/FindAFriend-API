import { Pet, Prisma } from '@prisma/client'

export interface PetRepository {
	items: Pet[]
	create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
