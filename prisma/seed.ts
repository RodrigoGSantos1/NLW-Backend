import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const user = await prisma.user.create({
        data: {
            name: 'John',
            email: 'john@prisma.io',
            avatarUrl: 'https://github.com/RodrigoGSantos1,png',

        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'exemplo 1',
            code: '123456',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id,
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-02T14:00:00.410Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-04T14:00:00.410Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',


            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,
                    

                    participants: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })


}

main()