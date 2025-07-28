import { expect, it, describe, beforeEach } from 'vitest'
import { OrgRepository } from '@/repositories/org-repository'
import { InMemoryOrgRepository } from '@/repositories/in-memory-repository/in-memory-org-repository'
import { makeOrgData } from '@/utils/test/factories/make-org-data'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../@errors/invalid-credentials-error'

describe('Authenticate UseCase Unit', async () => {
	let sut: AuthenticateUseCase
	let orgRepository: OrgRepository

	beforeEach(() => {
		orgRepository = new InMemoryOrgRepository()
		sut = new AuthenticateUseCase(orgRepository)
	})

	const data = makeOrgData()
	const orgData = { ...data, password_hash: await hash(data.password, 6) }

	it('should be possible to authenticate', async () => {
		const createdOrg = await orgRepository.create(orgData)

		const { org } = await sut.use({
			email: createdOrg.email,
			password: orgData.password
		})

		expect(org.id).toEqual(expect.any(String))
	})

	it('should not be possible to authenticate with wrong email', async () => {
		await expect(async () => {
			await sut.use({
				email: 'inexistent-email',
				password: '123456'
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be possible to authenticate with wrong password', async () => {
		const org = await orgRepository.create(orgData)

		await expect(async () => {
			await sut.use({
				email: org.email,
				password: 'wrong-password'
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
