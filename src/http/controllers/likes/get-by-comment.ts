import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { GetLikeByCommentUseCase } from "@/use-cases/get-like-by-comment";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getLikesByComment(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        commentId: z.string().uuid()
    })

    const { commentId } = getParamsSchema.parse(request.params)

    try {
        const prismaLikesRepository = new PrismaLikesRepository()
        const getLikesByCommentUseCase = new GetLikeByCommentUseCase(prismaLikesRepository)
        const likes = await getLikesByCommentUseCase.execute({
            commentId
        })

        return reply.status(200).send(likes)
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message})
        }
        throw err
    }
}