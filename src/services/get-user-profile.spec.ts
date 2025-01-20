import { InMemoryRepository } from "@/repositories/in-memory/in-memory-repository"
import { expect, describe, it, beforeEach } from "vitest"
import { AuthenticateUseCase } from "./authenticate";
import bcrypt from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryRepository;
let sut: GetUserProfileUseCase

describe('Get user profile Use case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('deve ser possível retornar o perfil do usuario', async () => {
        const createdUser = await usersRepository.create({
            name: 'JohnDoe',
            email: 'johndoe@gmail.com',
            password_hash: await bcrypt.hash('123456', 2)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.id).toEqual(expect.any(String))
    })
    it('nao deve ser possível achar o perfil do usuário', async () => {

        expect(() => sut.execute({
            userId: 'non-existing-id'
        }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})