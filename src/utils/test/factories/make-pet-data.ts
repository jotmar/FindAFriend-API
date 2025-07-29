import { faker } from '@faker-js/faker'
import { $Enums } from '@prisma/client'
import { randomUUID } from 'crypto'

export function makePetData() {
	const petData = {
		name: faker.animal.petName(),
		specie: faker.animal.type(),
		breed: 'normal',
		color: faker.color.human(),
		size: $Enums.Size.MEDIUM,
		org_id: String(randomUUID())
	}

	return petData
}
