import { prisma } from "@/lib/prisma"
import { hash } from "crypto"

interface RegisterServiceParams {
    name: string,
    email: string,
    password: string
}

export async function registerUseCase({
    name,
    email,
    password
}: RegisterServiceParams) {
    const password_hash = await hash(password, 2)

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userWithSameEmail) {
        return reply.status(409).send()
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
        }
    })

}