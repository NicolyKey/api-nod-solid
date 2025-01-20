import { prisma } from "@/lib/prisma"
import { UsersRepository } from "@/repositories/users-repository"
import bcrypt from "bcryptjs"
import { UserAlreadyExistError } from "./errors/user-already-exist"
import { User } from "@prisma/client"

interface RegisterServiceParams {
    name: string,
    email: string,
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        name,
        email,
        password
    }: RegisterServiceParams): Promise<RegisterUseCaseResponse> {
        const password_hash = await bcrypt.hash(password, 2)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistError()
        }

        const user = await this.usersRepository.create(
            {
                name,
                email,
                password_hash
            }
        )

        return {
            user,
        }

    }

}

