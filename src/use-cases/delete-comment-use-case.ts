import { Comment } from "@prisma/client"
import { CommentsRepository } from "@/repositories/comments-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found"

interface DeleteCommentUseCaseRequest {
    commentId: string
}

interface DeleteCommentUseCaseResponse {
    comment: Comment
}

export class DeleteCommentUseCase {
    constructor(private commentsRepository: any) {}

    async execute({ commentId }: DeleteCommentUseCaseRequest): Promise<DeleteCommentUseCaseResponse> {
        const comment = await this.commentsRepository.softDelete(commentId)

        if (!comment) {
            throw new ResourceNotFoundError()
        }
        
        return { comment }
    }
}