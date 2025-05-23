import { prisma } from "@/lib/prisma"
import { Prisma, Comment } from "@prisma/client"

export interface CommentsRepository {
    getAll(page: number, pageSize: number): Promise<{ userId: string; id: string; conteudo: string; data: Date; postId: string; deleted_at: Date | null; }[]>;
}

export class PrismaCommentsRepository {
    async permanentDelete(): Promise<void> {
        const THIRTY_DAYS_AGO = new Date()
        THIRTY_DAYS_AGO.setDate(THIRTY_DAYS_AGO.getDate() - 30)

        await prisma.comment.deleteMany({
            where: {
                deleted_at: {
                    lte: THIRTY_DAYS_AGO
                }
            }
        })
    }

    async findByUserId(userId: string): Promise<Comment[]> {
        return await prisma.comment.findMany({
            where: {
                userId,
                deleted_at: null
            }
        })
    }

    async findByPostId(postId: string): Promise<Comment[]> {
        return await prisma.comment.findMany({
            where: {
                postId,
                deleted_at: null
            }
        })
    }

    async findById(id: string): Promise<Comment | null> {
        return await prisma.comment.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: string, data: Prisma.CommentUpdateInput): Promise<Comment | null> {
        const comment = await prisma.comment.update({ 
            where: { id },
            data: {
                conteudo: data.conteudo,
                deleted_at: data.deleted_at
            }
        })
        return comment
    }

    async softDelete(id: string): Promise<Comment | null> {
        const comment = await prisma.comment.update({
            where: {
                id
            },
            data: {
                deleted_at: new Date()
            }
        })
        return comment
    }

    async getAll(page: number, pageSize: number): Promise<{ userId: string; id: string; conteudo: string; data: Date; postId: string; deleted_at: Date | null; }[]> {
        const skip = (page - 1) * pageSize
        const take = pageSize

        return await prisma.comment.findMany({
            where: {
                deleted_at: null
            },
            skip,
            take,
            orderBy: {
                data: "desc"
            }
        })
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