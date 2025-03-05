import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { UpdateCommentUseCase } from "@/use-cases/update-comment-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        commentId: z.string().uuid()
    })

    const updateBodySchema = z.object({
        conteudo: z.string()
    })

    const { commentId } = updateParamsSchema.parse(request.params)

    const { conteudo } = updateBodySchema.parse(request.body) 

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository()
        const updateCommentUseCase = new UpdateCommentUseCase(prismaCommentsRepository)
        const comment = await updateCommentUseCase.execute({
            commentId,
            conteudo
        })

        return reply.status(200).send(comment)
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message})
        }
        throw err
    }
}