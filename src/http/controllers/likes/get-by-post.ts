import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { GetLikeByPostUseCase } from "@/use-cases/get-like-by-post-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getLikesByPost(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        postId: z.string().uuid()
    })

    const { postId } = getParamsSchema.parse(request.params)

    try {
        const prismaLikesRepository = new PrismaLikesRepository()
        const getLikesByPostUseCase = new GetLikeByPostUseCase(prismaLikesRepository)
        const likes = await getLikesByPostUseCase.execute({
            postId
        })

        return reply.status(200).send(likes)
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message})
        }
        throw err
    }   
}