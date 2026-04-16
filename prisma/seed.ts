import prisma from '../src/lib/prisma'

export const seededUsers = [
  {
    id: 'user_owner',
    name: 'John',
    lastName: 'Owner',
    email: 'owner@nerdys.com',
    cedula: 'V11111111',
    phone: '04121111111',
    role: 'owner',
  },
  {
    id: 'user_admin',
    name: 'Jane',
    lastName: 'Admin',
    email: 'admin@nerdys.com',
    cedula: 'V22222222',
    phone: '04122222222',
    role: 'admin',
  },
  {
    id: 'user_member1',
    name: 'Bob',
    lastName: 'Cutter',
    email: 'bob@nerdys.com',
    cedula: 'V33333333',
    phone: '04123333333',
    role: 'member',
  },
  {
    id: 'user_member2',
    name: 'Alice',
    lastName: 'Style',
    email: 'alice@nerdys.com',
    cedula: 'V44444444',
    phone: '04124444444',
    role: 'member',
  },
]

export async function seed() {
  const org = await prisma.organization.upsert({
    where: { slug: 'nerdys-barber' },
    update: {},
    create: {
      id: 'org_1',
      name: 'Nerdys Barber',
      slug: 'nerdys-barber',
      createdAt: new Date(),
      slogan: 'The best fade in town',
      address: 'Main Street 123',
    },
  })

  for (const u of seededUsers) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        id: u.id,
        name: u.name,
        lastName: u.lastName,
        email: u.email,
        cedula: u.cedula,
        phone: u.phone,
      },
    })

    await prisma.member.upsert({
      where: { id: `mem_${u.id}` },
      update: { role: u.role },
      create: {
        id: `mem_${u.id}`,
        organizationId: org.id,
        userId: user.id,
        role: u.role,
        createdAt: new Date(),
      },
    })
  }
}

if (require.main === module) {
  seed()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}
