import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { CreateCommentUseCase } from "@/use-cases/create-comment-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        conteudo: z.string(),
        postId: z.string().uuid()
    })

    const { conteudo, postId } = createBodySchema.parse(request.body)

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository()
        const createCommentUseCase = new CreateCommentUseCase(prismaCommentsRepository)
        await createCommentUseCase.execute({
            conteudo,
            postId,
            userId: request.user.sub
        })
    } catch (err) {
        throw err
    }

    return reply.status(201).send('Comentário criado com sucesso!')
}