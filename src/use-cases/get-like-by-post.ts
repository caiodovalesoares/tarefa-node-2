import { LikesRepository } from "@/repositories/likes-repository"
import { Like } from "@prisma/client"

interface GetLikeByPostRequest {
    postId: string
}

export class GetLikeByPostUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({ postId }: GetLikeByPostRequest): Promise<Like[]> {
        return await this.likesRepository.findByPostId(postId)
    }
}