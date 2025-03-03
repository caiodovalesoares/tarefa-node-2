import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface GetUserUseCaseRequest {
    userId: string
}

interface GetUserUseCaseResponse {
    user: User
}

export class GetUserCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({userId}: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
       const user = await this.usersRepository.findById(userId)

       if (!user) {
            throw new ResourceNotFoundError()
       }

       return { user }
    }
}