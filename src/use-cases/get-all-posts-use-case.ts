import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { Post } from "@prisma/client";

export class GetAllPostsUseCase {
    constructor(private postsRepository: PrismaPostsRepository) {}

    async execute(page: number, pageSize: number): Promise<Post[]> {
        return await this.postsRepository.getAll(page, pageSize)
    }
}