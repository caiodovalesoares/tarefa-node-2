import { LikesRepository } from "@/repositories/likes-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found"
import { Like } from "@prisma/client"

interface GetLikeUseCaseRequest {
    likeId: string
}

export class GetLikeUseCase {
    constructor(private likesRepository: LikesRepository) {}
    
    async execute({ likeId }: GetLikeUseCaseRequest): Promise<Like | null> {
        const like = await this.likesRepository.findByid(likeId)

        if (!like) {
            throw new ResourceNotFoundError()
        }

        return like
    }
}