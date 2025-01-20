import { InMemoryRepository } from "@/repositories/in-memory/in-memory-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateUseCase() {
    // Toda vez que eu faço um registro eu fao
    const usersRepository = new InMemoryRepository()
    const sut = new AuthenticateUseCase(usersRepository)
    return sut
}