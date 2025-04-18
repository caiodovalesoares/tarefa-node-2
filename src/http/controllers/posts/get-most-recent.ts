import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { GetMostRecentPostsUseCase } from "@/use-cases/get-most-recent-posts-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getMostRecentPosts(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { limit = 5 } = request.query as { limit: number }
        const prismaPostsRepository = new PrismaPostsRepository()
        const getMostRecentPostsUseCase = new GetMostRecentPostsUseCase(prismaPostsRepository);
        const posts = await getMostRecentPostsUseCase.execute(limit)

        return reply.status(200).send(posts)
    }
    catch (err) {
        console.error("Erro ao buscar posts mais recentes:", err)
        return reply.status(500).send({ message: "Erro interno no servidor" })
    }
}