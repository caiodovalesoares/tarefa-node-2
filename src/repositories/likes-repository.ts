import { Prisma, Like } from "@prisma/client";

export interface LikesRepository {
    create(data: Prisma.LikeUncheckedCreateInput): Promise<Like>
    delete(id: string): Promise<Like | null>
}