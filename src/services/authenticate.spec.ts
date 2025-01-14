import { InMemoryRepository } from "@/repositories/in-memory/in-memory-repository"
import { expect, describe, it } from "vitest"
import { RegisterUseCase } from './register';
import { UsersRepository } from '../repositories/users-repository';

describe('Authenticate Use case', () => {
    it('deve ser possível autenticar o suusraio', async () => {
        const UsersRepository = new InMemoryRepository()
        const registerUseCase = new RegisterUseCase(UsersRepository)

        const { user } = await registerUseCase.execute({
            name: 'John',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })
})