import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { GetCommentsByPostUseCase } from "@/use-cases/get-comment-by-post-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getCommentsByPost(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        postId: z.string().uuid()
    })

    const { postId } = getParamsSchema.parse(request.params)

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository()
        const getCommentsByPostUseCase = new GetCommentsByPostUseCase(prismaCommentsRepository)
        const comments = await getCommentsByPostUseCase.execute({
            postId })

        return reply.status(200).send(comments)
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message})
        }
        throw err
    }
}