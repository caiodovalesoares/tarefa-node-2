import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { DeleteLikeUseCase } from "@/use-cases/delete-like-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteLike(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        likeId: z.string().uuid()
    })

    const { likeId } = getParamsSchema.parse(request.params)

    try {
        const prismaLikesRepository = new PrismaLikesRepository()
        const deleteLikeUseCase = new DeleteLikeUseCase(prismaLikesRepository)
        const like = await deleteLikeUseCase.execute({
            likeId
        })

        return reply.status(204).send({ like })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message})
        }
        throw err
    }
}