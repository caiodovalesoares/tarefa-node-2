import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { UpdatePostCase } from "@/use-cases/update-post-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        postId: z.string().uuid()
    })

    const updateBodySchema = z.object({
        titulo: z.string().optional(),
        conteudo: z.string().optional(),
        data: z.string().transform((str) => new Date(str)).optional(),
        userId: z.string().uuid().optional()
    })

    const { postId } = updateParamsSchema.parse(request.params)

    const { titulo, conteudo, data, userId } = updateBodySchema.parse(request.body)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const updatePostUseCase = new UpdatePostCase(prismaPostsRepository)
        const post = await updatePostUseCase.execute({
            postId,
            data: {
                titulo,
                conteudo,
                data,
                userId
            }
        })

        return reply.status(200).send(post)
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message})
        }
        throw err
    }
}