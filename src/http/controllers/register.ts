import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { RegisterUseCase } from '@/services/register'
import { Prisma } from '@prisma/client'
import { PrismaUsersRepositorie } from '@/repositories/prisma-users-repositories'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),

    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepositorie()
        const registerUsecase = new RegisterUseCase(prismaUsersRepository)

        await registerUsecase.execute({
            name, email, password
        })
    } catch (e) {
        return reply.status(409).send()
    }


    return reply.status(201).send()
}