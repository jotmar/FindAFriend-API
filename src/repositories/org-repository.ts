import { Org, Prisma } from '@prisma/client'

export interface OrgRepository {
	items: Org[]
	create(data: Prisma.OrgCreateInput): Promise<Org>
	findByEmail(email: string): Promise<Org | null>
}
