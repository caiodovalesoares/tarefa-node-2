import { CommentsRepository } from "@/repositories/comments-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found"
import { Comment } from "@prisma/client"

interface UpdateCommentUseCaseRequest {
    commentId: string
    conteudo: string
}

interface UpdateCommentUseCaseResponse {
    comment: Comment
}

export class UpdateCommentUseCase {
    constructor(private commentsRepository: any) {}

    async execute({ commentId, conteudo }: UpdateCommentUseCaseRequest): Promise<UpdateCommentUseCaseResponse> {
        const comment = await this.commentsRepository.update(commentId, { conteudo })

        if (!comment) {
            throw new ResourceNotFoundError()
        }

        const updatedComment = await this.commentsRepository.update(commentId, { conteudo })
        if (!updatedComment) {
            throw new ResourceNotFoundError()
        }

        return { comment }
    }
}