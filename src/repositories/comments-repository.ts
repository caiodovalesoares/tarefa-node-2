import { Prisma, Comment } from "@prisma/client";

interface CommentUpdateInput {
    conteudo: string
    deleted_at?: Date | null
}

export interface CommentsRepository {
    create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>
    getAll(): Promise<Comment[]>
    softDelete(id: string): Promise<Comment | null>
    permanentDelete(id: string): Promise<void>
    update(id: string, data: CommentUpdateInput): Promise<Comment | null>
    findById(id: string): Promise<Comment | null>
    findByUserId(userId: string): Promise<Comment[]>
    findByPostId(postId: string): Promise<Comment[]>
}