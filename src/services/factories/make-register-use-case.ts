import { InMemoryRepository } from "@/repositories/in-memory/in-memory-repository"
import { RegisterUseCase } from "../register"

export function makeRegisterUseCase() {
    // Toda vez que eu faço um registro eu fao
    const usersRepository = new InMemoryRepository()
    const sut = new RegisterUseCase(usersRepository)
    return sut
}