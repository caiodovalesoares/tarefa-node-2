import { Like, Prisma, PrismaClient } from "@prisma/client";
import { LikesRepository } from "../likes-repository";

export class PrismaLikesRepository implements LikesRepository {
    private prisma = new PrismaClient()

    async create(data: Prisma.LikeUncheckedCreateInput): Promise<Like> {
        if (!data.postId && !data.commentId) {
            throw new Error("É necessário informar um postId ou commentId para criar um like")
        }

        return this.prisma.like.create({
            data
        });
    }
}