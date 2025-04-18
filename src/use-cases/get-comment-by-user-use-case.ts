import { CommentsRepository } from "@/repositories/comments-repository"
import { Comment } from "@prisma/client"

interface GetCommentsByUserRequest {
    userId: string
}

export class GetCommentsByUserUseCase {
    constructor(private commentsRepository: any) {}

    async execute({ userId }: GetCommentsByUserRequest): Promise<Comment[]> {
        return await this.commentsRepository.findByUserId(userId)
    }
}