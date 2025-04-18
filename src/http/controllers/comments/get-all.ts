import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { GetAllCommentsUseCase } from "@/use-cases/get-all-comments-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { page = 1, pageSize = 5 } = request.query as { page: number; pageSize: number }

        const prismaCommentsRepository = new PrismaCommentsRepository()
        const getAllCommentsUseCase = new GetAllCommentsUseCase(prismaCommentsRepository)
        const comments = await getAllCommentsUseCase.execute(page, pageSize)

        return reply.status(200).send(comments)
    } catch (err) {
        console.error("Erro ao buscar todos os comentários:", err)
        return reply.status(500).send({ message: "Erro interno no servidor" })
    }
}