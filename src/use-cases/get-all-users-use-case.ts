import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { User } from "@prisma/client";

export class GetAllUsersUseCase {
    constructor(private usersRepository: PrismaUsersRepository) {}

    async execute(): Promise<User[]> {
        return await this.usersRepository.getAll()
    }
}