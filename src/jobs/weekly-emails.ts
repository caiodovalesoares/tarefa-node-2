import cron from "node-cron";
import nodemailer from "nodemailer";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import dotenv from "dotenv";

dotenv.config();

export async function sendWeeklyEmails() {
    const prismaPostsRepository = new PrismaPostsRepository()
    const prismaUsersRepository = new PrismaUsersRepository()

    const mostLikedPosts = await prismaPostsRepository.findMostLikedPosts(5)
    if (mostLikedPosts.length === 0) {
        console.log("Nenhum post curtido nesta semana.")
        return
    }

    const users = await prismaUsersRepository.getAll()
    if (users.length === 0) {
        console.log("Nenhum usuário cadastrado para receber o e-mail.")
        return
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })

    const emailContent = `
        <h1>Resumo Semanal: Posts Mais Curtidos</h1>
        <ul>
            ${mostLikedPosts
                .map(
                    (post) => `
                <li>
                    <strong>${post.titulo}</strong> - ${post.likesCount} curtidas
                    <p>${post.conteudo}</p>
                </li>
            `
                )
                .join("")}
        </ul>
    `

    for (const user of users) {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Resumo Semanal: Posts Mais Curtidos",
            html: emailContent,
        })
    }

    console.log("E-mails semanais enviados com sucesso!")
}

cron.schedule("0 16 * * 0", async () => {
    console.log("Executando tarefa semanal de envio de e-mails...")
    await sendWeeklyEmails()
})