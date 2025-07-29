import { faker } from '@faker-js/faker'
import { hashSync } from 'bcryptjs'

const password = faker.internet.password()

export function makeOrgData() {
	const orgData = {
		name: faker.company.name(),
		description: faker.company.buzzPhrase(),
		address: faker.location.street(),
		city: faker.location.city(),
		tel: faker.phone.number(),
		email: faker.internet.email(),
		password,
		password_hash: hashSync(password, 6)
	}

	return orgData
}
