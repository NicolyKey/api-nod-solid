import { prisma } from "@/lib/prisma"
import { PrismaUsersRepositorie } from "@/repositories/prisma-users-repositories"
import { hash } from "bcryptjs"

interface RegisterServiceParams {
    name: string,
    email: string,
    password: string
}

export class RegisterUseCase {
    constructor(private usersRepository: any) { }

    async execute({
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
            throw new Error('This amail its already linked to another count')
        }

        await this.usersRepository.create(
            {
                name,
                email,
                password_hash
            }
        )

    }

}

