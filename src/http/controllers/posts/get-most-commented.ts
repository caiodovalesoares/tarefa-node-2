import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { GetMostCommentedPostsUseCase } from "@/use-cases/get-most-commented-posts-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getMostCommentedPosts(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { limit = 5 } = request.query as { limit: number }
        const prismaPostsRepository = new PrismaPostsRepository()
        const getMostCommentedPostsUseCase = new GetMostCommentedPostsUseCase(prismaPostsRepository);
        const posts = await getMostCommentedPostsUseCase.execute(limit)

        return reply.status(200).send(posts)
    }
    catch (err) {
        console.error("Erro ao buscar posts mais comentados:", err)
        return reply.status(500).send({ message: "Erro interno no servidor" })
    }
}