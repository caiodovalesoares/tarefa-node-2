import { LikesRepository } from "@/repositories/likes-repository"
import { Like } from "@prisma/client"

interface GetLikesByUserRequest {
    userId: string
}

export class GetLikesByUserUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({ userId }: GetLikesByUserRequest): Promise<Like[]> {
        return await this.likesRepository.findByUserId(userId)
    }
}