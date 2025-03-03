import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetAllUsersUseCase } from "@/use-cases/get-all-users-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const getAllUsersUseCase = new GetAllUsersUseCase(prismaUsersRepository)
        const users = await getAllUsersUseCase.execute()

        return reply.status(200).send(users)
    } catch (err) {
        console.error("Erro ao buscar todos os usuários:", err)
        return reply.status(500).send({ message: "Erro interno no servidor" })
    }
}