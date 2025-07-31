import { Prisma, Org } from '@prisma/client'
import { OrgRepository } from '../org-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgRepository implements OrgRepository {
	public items: Org[] = []

	async create(data: Prisma.OrgCreateInput): Promise<Org> {
		const org: Org = {
			id: randomUUID(),
			name: data.name,
			description: data.description,
			tel: data.tel,
			address: data.address,
			city: data.city,
			email: data.email,
			password_hash: data.password_hash
		}

		this.items.push(org)

		return org
	}

	async findByEmail(email: string): Promise<Org | null> {
		const org = this.items.find(item => item.email === email)

		if (!org) {
			return null
		}

		return org
	}

	async findByCity(city: string): Promise<Org[]> {
		const orgs = this.items.filter(item => item.city === city)

		return orgs
	}

	async findById(id: string): Promise<Org | null> {
		const org = this.items.find(item => item.id === id)

		if (!org) {
			return null
		}

		return org
	}
}
