import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { Comment } from '@prisma/client';

interface CreateCommentUseCaseRequest {
    conteudo: string
    postId: string
    userId: string
}

interface CreateCommentUseCaseResponse {
    comment: Comment
}

export class CreateCommentUseCase {
    constructor(private commentsRepository: PrismaCommentsRepository) {}
    async execute({ conteudo, postId, userId}: CreateCommentUseCaseRequest): Promise<CreateCommentUseCaseResponse> {
        const comment = await this.commentsRepository.create({
            conteudo,
            postId,
            userId
        })
        return { comment }
    }
}