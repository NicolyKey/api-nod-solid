import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-repository'
import { UserAlreadyExistError } from './errors/user-already-exist'


let usersRepository: InMemoryRepository
let sut: RegisterUseCase

describe('Registro de Usuario', () => {

    beforeEach(() => {
        usersRepository = new InMemoryRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    it('a senha do ususário deve estar configurada em hash', async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoii@email.com',
            password: '123456'
        })

        const isPasswordCorrectlyHash = await compare('123456', user.password_hash)
        expect(isPasswordCorrectlyHash).toBe(true)
    })

    it('não deve ser possível se cadastrar duas vezes com o mesmo email', async () => {
        const email = "joao@gmail.com"

        await sut.execute({
            name: 'Joao',
            email,
            password: '111111'
        })

        await expect(() =>
            sut.execute({
                name: 'Joao',
                email,
                password: '111111'

            })
        ).rejects.toBeInstanceOf(UserAlreadyExistError)
    })

    it('deve ser possível registrar', async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoii@email.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String));
    })
})
