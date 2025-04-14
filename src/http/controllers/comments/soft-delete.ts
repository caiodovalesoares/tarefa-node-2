import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { DeleteCommentUseCase } from "@/use-cases/delete-comment-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteComment(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        commentId: z.string().uuid()
    })

    const { commentId } = getParamsSchema.parse(request.params)

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository()
        const deleteCommentUseCase = new DeleteCommentUseCase(prismaCommentsRepository)
        const comment = await deleteCommentUseCase.execute({
            commentId
        })

        return reply.status(204).send({ comment })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message})
        }
        throw err
    }
}