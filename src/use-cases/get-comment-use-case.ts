import { CommentsRepository } from "@/repositories/comments-repository"
import { Comment } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found"

interface GetCommentUseCaseRequest {
    commentId: string
}

export class GetCommentUseCase {
    constructor(private commentsRepository: CommentsRepository) {}

    async execute({ commentId }: GetCommentUseCaseRequest): Promise<Comment | null> {
        const comment = await this.commentsRepository.findById(commentId)

        if (!comment) {
            throw new ResourceNotFoundError()
        }

        return comment
    }
}