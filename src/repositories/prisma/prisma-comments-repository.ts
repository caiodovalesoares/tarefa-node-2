import { prisma } from "@/lib/prisma"
import { Prisma, Comment } from "@prisma/client"

export class PrismaCommentsRepository {
    async update(id: string, data: Prisma.CommentUpdateInput): Promise<Comment | null> {
        const comment = await prisma.comment.update({ 
            where: { id },
            data: {
                conteudo: data.conteudo
            }
        })
        return comment
    }

    async delete(id: string): Promise<Comment | null> {
        const comment = await prisma.comment.delete({
            where: {
                id
            }
        })
        return comment
    }

    async getAll(): Promise<Comment[]> {
        return await prisma.comment.findMany()
    }

   async create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
           try {
               const comment = await prisma.comment.create({
                   data
               })
               return comment
           } catch (error) {
               console.error("Erro criando comentário:", error)
               throw new Error("Erro ao criar comentário")
           }
       }
}