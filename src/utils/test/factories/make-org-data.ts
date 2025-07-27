import { faker } from '@faker-js/faker'
export function makeOrgData() {
	const orgData = {
		name: faker.company.name(),
		description: faker.company.buzzPhrase(),
		address: faker.location.street(),
		city: faker.location.city(),
		tel: faker.phone.number(),
		email: faker.internet.email(),
		password: faker.internet.password()
	}

	return orgData
}
