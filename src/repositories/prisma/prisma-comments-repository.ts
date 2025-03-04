import { prisma } from "@/lib/prisma"
import { Prisma, Comment } from "@prisma/client"

export class PrismaCommentsRepository {
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