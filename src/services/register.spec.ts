import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'


describe('Registro de Usuario', () => {
    it('a senha do ususário deve estar configurada em hash', async () => {
        const registerUseCase = new RegisterUseCase({
            async findByEmail(email) {
                return null
            },

            async create(data) {
                return {
                    id: 'user-1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date(),
                }
            }

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
