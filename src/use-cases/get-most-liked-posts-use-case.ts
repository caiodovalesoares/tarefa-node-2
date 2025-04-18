import { Post } from "@prisma/client"

export class GetMostLikedPostsUseCase {
    constructor(private postsRepository: any) {}

    async execute(limit: number = 10): Promise<Post[]> {
        const posts = await this.postsRepository.findMostLikedPosts(limit)

        return posts
    }
}