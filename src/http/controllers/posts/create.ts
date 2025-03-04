import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { CreatePostUseCase } from "@/use-cases/create-post-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string()
    })

    const { titulo, conteudo } = createBodySchema.parse(request.body)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const createPostUseCase = new CreatePostUseCase(prismaPostsRepository)
        await createPostUseCase.execute({
            titulo,
            conteudo,
            userId: request.user.sub
        })
    } catch (err) {
        throw err
    }

    return reply.status(201).send('Post criado com sucesso!')
}