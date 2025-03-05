import { LikesRepository } from "@/repositories/likes-repository"
import { Like } from "@prisma/client"

interface GetLikeByCommentRequest {
    commentId: string
}   

export class GetLikeByCommentUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({ commentId }: GetLikeByCommentRequest): Promise<Like[]> {
        return await this.likesRepository.findByCommentId(commentId)
    }
}