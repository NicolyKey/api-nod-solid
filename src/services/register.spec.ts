import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-repository'
import { UserAlreadyExistError } from './errors/user-already-exist'


describe('Registro de Usuario', () => {
    it('a senha do ususário deve estar configurada em hash', async () => {
        const usersRepository = new InMemoryRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoii@email.com',
            password: '123456'
        })

        const isPasswordCorrectlyHash = await compare('123456', user.password_hash)

        expect(isPasswordCorrectlyHash).toBe(true)
    })

    it('não deve ser possível se cadastrar duas vezes com o mesmo email', async () => {
        const usersRepository = new InMemoryRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = "joao@gmail.com"

        await registerUseCase.execute({
            name: 'Joao',
            email,
            password: '111111'
        })

        await expect(() =>
            registerUseCase.execute({
                name: 'Joao',
                email,
                password: '111111'

            })
        ).rejects.toBeInstanceOf(UserAlreadyExistError)
    })

    it('deve ser possível registrar', async () => {
        const usersRepository = new InMemoryRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoii@email.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String));
    })
})
