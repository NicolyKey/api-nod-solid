import { InMemoryRepository } from "@/repositories/in-memory/in-memory-repository"
import { expect, describe, it, beforeEach } from "vitest"
import { AuthenticateUseCase } from "./authenticate";
import bcrypt from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryRepository;
let sut: AuthenticateUseCase

describe('Authenticate Use case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })

    it('deve ser possível autenticar o suusraio', async () => {
        await usersRepository.create({
            name: 'JohnDoe',
            email: 'johndoe@gmail.com',
            password_hash: await bcrypt.hash('123456', 2)
        })

        const { user } = await sut.execute({
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })
    it('nao deve ser possível autenticar o suusraio', async () => {

        expect(() => sut.execute({
            email: 'johndoe@gmail.com',
            password: '123456'
        }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
    it('nao deve ser possível autenticar o suusraio, senha errada', async () => {


        await usersRepository.create({
            name: 'JohnDoe',
            email: 'johndoe@gmail.com',
            password_hash: await bcrypt.hash('12333356', 2)
        })

        expect(() => sut.execute({
            email: 'johndoe@gmail.com',
            password: '123456'
        }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})