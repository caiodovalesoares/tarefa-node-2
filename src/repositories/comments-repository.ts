import { Prisma, Comment } from "@prisma/client";

interface CommentUpdateInput {
    conteudo: string
}

export interface CommentsRepository {
    create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>
    getAll(): Promise<Comment[]>
    delete(id: string): Promise<Comment | null>
    update(id: string, data: CommentUpdateInput): Promise<Comment | null>
    findById(id: string): Promise<Comment | null>
    findByUserId(userId: string): Promise<Comment[]>
    findByPostId(postId: string): Promise<Comment[]>
}