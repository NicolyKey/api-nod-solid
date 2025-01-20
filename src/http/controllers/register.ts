import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistError } from '@/services/errors/user-already-exist'
import { makeRegisterUseCase } from '@/services/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),

    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {

        const registerUsecase = makeRegisterUseCase()

        await registerUsecase.execute({
            name, email, password
        })
    } catch (e) {
        if (e instanceof UserAlreadyExistError) {
            return reply.status(409).send({ message: e.message })
        }

        throw e
    }


    return reply.status(201).send()
}