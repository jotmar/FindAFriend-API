import { Prisma, Org } from '@prisma/client'
import { OrgRepository } from '../org-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgRepository implements OrgRepository {
	items: Org[] = []

	async create(data: Prisma.OrgCreateInput): Promise<Org> {
		const org = await prisma.org.create({
			data
		})

		return org
	}

	async findByEmail(email: string): Promise<Org | null> {
		const org = await prisma.org.findUnique({
			where: {
				email
			}
		})

		return org
	}

	async findByCity(city: string): Promise<Org[]> {
		const orgs = await prisma.org.findMany({
			where: {
				city
			}
		})

		return orgs
	}
}
