import { Post } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { PostsRepository } from "@/repositories/posts-repository";

interface DeletePostUseCaseRequest {
    postId: string
}

interface DeletePostUseCaseResponse {
    post: Post
}

export class DeletePostUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({ postId }: DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse> {
       const post = await this.postsRepository.delete(postId)

       if (!post) {
            throw new ResourceNotFoundError()
       }

       return { post }
    }
}