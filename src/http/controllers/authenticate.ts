import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/services/factories/make-authenticate-use-case'

export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),

    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {

        const authenticateUsecase = makeAuthenticateUseCase()

        await authenticateUsecase.execute({
            email, password
        })
    } catch (e) {
        if (e instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: e.message })
        }

        throw e
    }


    return reply.status(200).send()
}