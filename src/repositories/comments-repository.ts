import { Prisma, Comment } from "@prisma/client";

export interface CommentsRepository {
    create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>
    getAll(): Promise<Comment[]>
}