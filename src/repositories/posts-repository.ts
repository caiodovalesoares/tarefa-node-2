import { Post, Prisma } from "@prisma/client";

export interface PostUpdateInput {
    titulo?: string
    conteudo?: string
    data?: Date
    userId?: string
    deleted_at?: Date | null
}

export interface PostsRepository {
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
    findById(id: string): Promise<Post | null>
    getAll(): Promise<Post[]>
    softDelete(id: string): Promise<Post | null>
    permanentDelete(id: string): Promise<void>
    update(id: string, data: PostUpdateInput): Promise<Post | null>
    findByUserId(userId: string): Promise<Post[] | null>
    findUserByPostId(postId: string): Promise<Post | null>
    findMostLikedPosts(): Promise<Post[] | null>
    findByKeyWord(): Promise<Post[] | null>
    findMostRecentPosts(): Promise<Post[] | null>
    findMostCommentedPosts(): Promise<Post[] | null>
}