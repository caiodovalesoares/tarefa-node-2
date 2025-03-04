import { Prisma, Comment } from "@prisma/client";

export interface PostsRepository {
    create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>
}