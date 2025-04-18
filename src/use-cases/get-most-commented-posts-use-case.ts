import { Post } from "@prisma/client"

export class GetMostCommentedPostsUseCase {
    constructor(private postsRepository: any) {}

    async execute(limit: number = 5): Promise<Post[]> {
        const posts = await this.postsRepository.findMostCommentedPosts(limit)

        return posts
    }
}