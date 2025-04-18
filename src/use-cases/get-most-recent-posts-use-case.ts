import { Post } from "@prisma/client"

export class GetMostRecentPostsUseCase {
    constructor(private postsRepository: any) {}

    async execute(limit: number = 5): Promise<Post[]> {
        const posts = await this.postsRepository.findMostRecentPosts(limit)

        return posts
    }
}