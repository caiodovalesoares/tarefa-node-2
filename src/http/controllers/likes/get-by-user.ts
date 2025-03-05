import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found"
import { GetLikesByUserUseCase } from "@/use-cases/get-like-by-user-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function getLikesByUser(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        userId: z.string().uuid()
    })

    const { userId } = getParamsSchema.parse(request.params)

    try {
        const prismaLikesRepository = new PrismaLikesRepository()
        const getLikesByUserUseCase = new GetLikesByUserUseCase(prismaLikesRepository)
        const likes = await getLikesByUserUseCase.execute({
            userId })

        return reply.status(200).send(likes)
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message})
        }
        throw err
    }
}