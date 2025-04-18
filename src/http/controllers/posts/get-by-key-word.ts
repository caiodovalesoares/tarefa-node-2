import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { GetPostsByKeyWordUseCase } from "@/use-cases/get-post-by-key-word-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getPostsByKeyWord(request: FastifyRequest, reply: FastifyReply) {
    const { keyWord } = request.query as { keyWord: string }

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const getPostsByKeyWordUseCase = new GetPostsByKeyWordUseCase(prismaPostsRepository)
        const posts = await getPostsByKeyWordUseCase.execute({
            keyWord 
        })

        return reply.status(200).send(posts)
    } catch (err) {
        console.error("Erro ao buscar posts por palavra-chave:", err)
        return reply.status(500).send({ message: "Erro interno no servidor" })
    }
}