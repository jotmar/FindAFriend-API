import { describe, it, expect, beforeEach } from 'vitest'
import { ProfileUseCase } from './profile'
import { OrgRepository } from '@/repositories/org-repository'
import { InMemoryOrgRepository } from '@/repositories/in-memory-repository/in-memory-org-repository'
import { makeOrgData } from '@/utils/test/factories/make-org-data'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'

describe('Profile UseCase Unit', () => {
	let sut: ProfileUseCase
	let orgRepository: OrgRepository

	beforeEach(() => {
		orgRepository = new InMemoryOrgRepository()
		sut = new ProfileUseCase(orgRepository)
	})

	const orgData = makeOrgData()

	it('should be possible to get org profile', async () => {
		const createdOrg = await orgRepository.create(orgData)

		const { org } = await sut.use({
			id: createdOrg.id
		})

		expect(org).toEqual(expect.objectContaining({ name: orgData.name }))
	})

	it('should not be possible to get org with invalid id', async () => {
		await expect(async () => {
			await sut.use({
				id: 'inexistent-id'
			})
		}).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
