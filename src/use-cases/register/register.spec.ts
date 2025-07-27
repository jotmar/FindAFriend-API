import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { OrgRepository } from '@/repositories/org-repository'
import { InMemoryOrgRepository } from '@/repositories/in-memory-repository/in-memory-org-repository'
import { makeOrgData } from '@/utils/test/factories/make-org-data'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../@errors/org-already-exists-error'

describe('Register UseCase Unit', () => {
	let sut: RegisterUseCase
	let orgRepository: OrgRepository

	beforeEach(() => {
		orgRepository = new InMemoryOrgRepository()
		sut = new RegisterUseCase(orgRepository)
	})

	const orgData = makeOrgData()

	it('should be possible to register as an ORG.', async () => {
		const { org } = await sut.use(orgData)

		expect(org.id).toEqual(expect.any(String))
	})

	it('should have a hashed password upon registration', async () => {
		const { org } = await sut.use(orgData)

		const checkPasswordHash = await compare(orgData.password, org.password_hash)

		expect(checkPasswordHash).toEqual(true)
	})

	it('should not be possible to register with an already existent email.', async () => {
		await sut.use(orgData)

		await expect(async () => {
			await sut.use(orgData)
		}).rejects.toBeInstanceOf(OrgAlreadyExistsError)
	})
})
