import { Post } from "@prisma/client"

interface GetPostsByKeyWordRequest {
    keyWord: string
}

export class GetPostsByKeyWordUseCase {
    constructor(private postsRepository: any) {}

    async execute({ keyWord }: GetPostsByKeyWordRequest): Promise<Post[]> {
        const posts = await this.postsRepository.findByKeyWord(keyWord)

        return posts 
    }
}