import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { GetMostLikedPostsUseCase } from "@/use-cases/get-most-liked-posts-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getMostLikedPosts(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { limit = 5 } = request.query as { limit: number }
        const prismaPostsRepository = new PrismaPostsRepository()
        const getMostLikedPostsUseCase = new GetMostLikedPostsUseCase(prismaPostsRepository);
        const posts = await getMostLikedPostsUseCase.execute(limit)

        return reply.status(200).send(posts)
    }
    catch (err) {
        console.error("Erro ao buscar posts mais curtidos:", err)
        return reply.status(500).send({ message: "Erro interno no servidor" })
    }
}