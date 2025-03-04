import { LikesRepository } from "@/repositories/likes-repository";

interface CreateLikeRequest {
    userId: string
    postId?: string
    commentId?: string
}

export class CreateLikeUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({ userId, postId, commentId }: CreateLikeRequest) {
        if (!postId && !commentId) {
            throw new Error("É necessário informar um postId ou commentId para criar um like")
        }

        await this.likesRepository.create({
            userId,
            postId: postId || null,
            commentId: commentId || null
        })
    }
}