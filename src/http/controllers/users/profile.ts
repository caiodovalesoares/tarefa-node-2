import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserCase } from "@/use-cases/get-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
        const prismaUsersRepository = new PrismaUsersRepository()
        const getUserUseCase = new GetUserCase(prismaUsersRepository)

        const { user } = await getUserUseCase.execute({
            userId: request.user.sub
        })

        return reply.status(200).send({
            user: {
                ...user,
                password: undefined
            }
        })
}