import { UsersRepository } from "@/repositories/users-repository";
import { compare } from 'bcryptjs';
import { UserAlreadyExists } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";
import { error } from "console";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
    email: string
    senha: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ email, senha }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(senha, user.senha)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return { user }
    }
}