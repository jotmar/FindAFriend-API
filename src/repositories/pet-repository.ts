import { $Enums, Pet, Prisma } from '@prisma/client'

export interface PetOptions {
	name?: string
	specie?: string
	breed?: string
	color?: string
	size?: $Enums.Size
}

export interface PetRepository {
	items: Pet[]
	create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
	fetchByOrg(orgId: string, options?: PetOptions): Promise<Pet[]>
	findById(id: string): Promise<Pet | null>
}
