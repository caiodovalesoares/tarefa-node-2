import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { Post } from "@prisma/client";

interface GetPostsByUserRequest {
    userId: string
}

export class GetPostsByUserUseCase {
    constructor(private postsRepository: PrismaPostsRepository) {}

    async execute({ userId }: GetPostsByUserRequest): Promise<Post[]> {
        return await this.postsRepository.findByUserId(userId)
    }
}