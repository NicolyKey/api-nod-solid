import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

class InMemoryRepository implements UsersRepository {
    async findByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async create(data: Prisma.UserCreateInput): Promise<User> {
        throw new Error("Method not implemented.");
    }

    //   async findByEmail(email) {
    //         return null
    //     },

    //     async create(data) {
    //         return {
    //             id: 'user-1',
    //             name: data.name,
    //             email: data.email,
    //             password_hash: data.password_hash,
    //             created_at: new Date(),
    //         }
    //     }

}