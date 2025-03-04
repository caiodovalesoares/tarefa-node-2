import { LikesRepository } from "@/repositories/likes-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found"
import { Like } from "@prisma/client"

interface DeleteLikeUseCaseRequest {
    likeId: string
}

interface DeleteLikeUseCaseResponse {
    like: Like
}

export class DeleteLikeUseCase {
    constructor(private likesRepository: LikesRepository) {}
    
    async execute({ likeId }: DeleteLikeUseCaseRequest): Promise<DeleteLikeUseCaseResponse> {
        const like = await this.likesRepository.delete(likeId)

        if (!like) {
            throw new ResourceNotFoundError()
        }

        return { like }
    }
}