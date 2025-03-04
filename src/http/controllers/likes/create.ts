import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { CreateLikeUseCase } from "@/use-cases/create-like-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createLike(request: FastifyRequest, reply: FastifyReply) {
    const createLikeSchema = z.object({
        postId: z.string().uuid().optional(),
        commentId: z.string().uuid().optional()
    });

    const { postId, commentId } = createLikeSchema.parse(request.body);

    try {
        const prismaLikesRepository = new PrismaLikesRepository();
        const createLikeUseCase = new CreateLikeUseCase(prismaLikesRepository);

        await createLikeUseCase.execute({
            userId: request.user.sub,
            postId,
            commentId
        });

        return reply.status(201).send('Like criado com sucesso!');
    } catch (err) {
        console.error(err);
        return reply.status(500).send('Erro ao criar like');
    }
}