import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { GetCommentsByUserUseCase } from "@/use-cases/get-comment-by-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getCommentsByUser(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        userId: z.string().uuid()
    })

    const { userId } = getParamsSchema.parse(request.params)

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository()
        const getCommentsByUserUseCase = new GetCommentsByUserUseCase(prismaCommentsRepository)
        const comments = await getCommentsByUserUseCase.execute({
            userId })

        return reply.status(200).send(comments)
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message})
        }
        throw err
    }
}