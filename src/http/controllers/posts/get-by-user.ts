import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { GetPostsByUserUseCase } from "@/use-cases/get-post-by-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPostsByUser(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        userId: z.string().uuid(),
    });

    const { userId } = getParamsSchema.parse(request.params)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const getPostsByUserUseCase = new GetPostsByUserUseCase(prismaPostsRepository)
        const posts = await getPostsByUserUseCase.execute({ userId })

        return reply.status(200).send(posts)
    } catch (err) {
        console.error("Erro ao buscar posts por usuário:", err)
        return reply.status(500).send({ message: "Erro interno no servidor" })
    }
}