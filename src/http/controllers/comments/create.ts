import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { CreateCommentUseCase } from "@/use-cases/create-comment-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";

dotenv.config()

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        conteudo: z.string(),
        postId: z.string().uuid()
    })

    const { conteudo, postId } = createBodySchema.parse(request.body)

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository()
        const createCommentUseCase = new CreateCommentUseCase(prismaCommentsRepository)

        const prismaPostsRepository = new PrismaPostsRepository()
        const post = await prismaPostsRepository.findUserByPostId(postId)
        if (!post) {
            return reply.status(404).send({ message: 'Post não encontrado' })
        }

        const { email, nome } = post.user

        await createCommentUseCase.execute({
            conteudo,
            postId,
            userId: request.user.sub
        })

        const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    }
                })
        
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Novo comentário!',
                    html: `<h1>Olá ${nome}!</h1>
                           <p>Seu post recebeu um novo comentário!</p>
                           <blockquote>${conteudo}</blockquote>`
                })
        
    } catch (err) {
        throw err
    }

    return reply.status(201).send('Comentário criado com sucesso!')
}