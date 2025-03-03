import { UsersRepository, UserUpdateInput } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { compare } from 'bcryptjs';
import bcrypt from 'bcryptjs';

interface UpdateUserUseCaseRequest {
    userId: string
    data: UserUpdateInput
}

interface UpdateUserUseCaseResponse {
    user: User
}

export class UpdateUserCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({userId, data}: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
       const user = await this.usersRepository.findById(userId)

       if (!user) {
            throw new ResourceNotFoundError()
       }

       if (data.senha) {
            const isSamePassword = await compare(data.senha, user.senha)
            if (isSamePassword) {
                throw new Error('As senhas devem ser diferentes')
            }

            data.senha = await bcrypt.hash(data.senha, 6)
       }

       const userUpdated = await this.usersRepository.update(userId, data)
       if (!userUpdated) {
            throw new ResourceNotFoundError()
       }

       return { user: userUpdated }
    }
}