import { Like, Prisma, PrismaClient } from "@prisma/client";
import { LikesRepository } from "../likes-repository";

export class PrismaLikesRepository implements LikesRepository {
    private prisma = new PrismaClient()

    async findByPostId(postId: string): Promise<Like[]> {
        return await this.prisma.like.findMany({
            where: { postId }
        })
    }

    async findByCommentId(commentId: string): Promise<Like[]> {
        return await this.prisma.like.findMany({
            where: { commentId }
        })
    }

    async findByUserId(userId: string): Promise<Like[]> {
        return await this.prisma.like.findMany({
            where: { userId }
        })
    }

    async findByid(id: string): Promise<Like | null> {
        return await this.prisma.like.findUnique({
            where: {
                id
            }
        })
    }

    async delete(id: string): Promise<Like | null> {
        const like = await this.prisma.like.delete({
            where: {
                id
            }
        })
        return like
    }

    async create(data: Prisma.LikeUncheckedCreateInput): Promise<Like> {
        if (!data.postId && !data.commentId) {
            throw new Error("É necessário informar um postId ou commentId para criar um like")
        }

        return this.prisma.like.create({
            data
        });
    }
}