import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { GetAllPostsUseCase } from "@/use-cases/get-all-posts-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { page = 1, pageSize = 5 } = request.query as { page: number; pageSize: number }

        const prismaPostsRepository = new PrismaPostsRepository()
        const getAllPostsUseCase = new GetAllPostsUseCase(prismaPostsRepository)
        const posts = await getAllPostsUseCase.execute(page, pageSize)

        return reply.status(200).send(posts)
    } catch (err) {
        console.error("Erro ao buscar todos os posts:", err)
        return reply.status(500).send({ message: "Erro interno no servidor" })
    }
}