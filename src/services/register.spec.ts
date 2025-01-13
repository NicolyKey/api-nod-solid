import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'


describe('Registro de Usuario', () => {
    it('a senha do ususário deve estar configurada em hash', async () => {
        const registerUseCase = new RegisterUseCase({


        })

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoii@email.com',
            password: '123456'
        })

        const isPasswordCorrectlyHash = await compare('123456', user.password_hash)

        expect(isPasswordCorrectlyHash).toBe(true)
    })
})
