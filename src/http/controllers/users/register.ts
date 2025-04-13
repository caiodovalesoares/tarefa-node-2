import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExists } from "@/use-cases/errors/user-already-exists-error";
import { RegisterUseCase } from "@/use-cases/register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config()

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        senha: z.string().min(6),
        foto: z.string().url()
    })

    const { nome, email, senha, foto } = registerBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)
        await registerUseCase.execute({
            nome,
            email,
            senha,
            foto
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
            subject: 'Cadastro realizado com sucesso!',
            html: `<h1>Olá ${nome}!</h1>
                   <p>Seu cadastro foi realizado com sucesso!</p>`
        })

    } catch (err) {
        if (err instanceof UserAlreadyExists) {
            return reply.status(409).send({ message: err.message})
        }
        throw err
    }

    return reply.status(201).send('Usuário criado com sucesso!')
}