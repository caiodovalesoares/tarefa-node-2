import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { Comment } from "@prisma/client";

export class GetAllCommentsUseCase {
    constructor(private commentsRepository: PrismaCommentsRepository) {}

    async execute(): Promise<Comment[]> {
        return await this.commentsRepository.getAll()
    }
}