import { PostsRepository } from "@/repositories/posts-repository";
import { Post } from '@prisma/client';

interface CreatePostUseCaseRequest {
    titulo: string
    conteudo: string
    data: Date
    userId: string
}

interface CreatePostUseCaseResponse {
    post: Post
}

export class CreatePostUseCase {
    constructor(private postsRepository: PostsRepository) {}
    async execute({titulo, conteudo, data, userId}: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
        const post = await this.postsRepository.create({
            titulo,
            conteudo,
            data,
            userId
        })
        return { post }
    }
}