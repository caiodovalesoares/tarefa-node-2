import { Post } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { PostsRepository } from "@/repositories/posts-repository";

interface GetPostUseCaseRequest {
    postId: string
}

export class GetPostCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({postId}: GetPostUseCaseRequest): Promise<Post> {
       const post = await this.postsRepository.findById(postId)

       if (!post) {
            throw new ResourceNotFoundError()
       }

       return post
    }
}