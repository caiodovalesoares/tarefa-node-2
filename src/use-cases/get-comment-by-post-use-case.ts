import { CommentsRepository } from "@/repositories/comments-repository"
import { Comment } from "@prisma/client"

interface GetCommentsByPostRequest {
    postId: string
}

export class GetCommentsByPostUseCase {
    constructor(private commentsRepository: CommentsRepository) {}

    async execute({ postId }: GetCommentsByPostRequest): Promise<Comment[]> {
        return await this.commentsRepository.findByPostId(postId)
    }
}