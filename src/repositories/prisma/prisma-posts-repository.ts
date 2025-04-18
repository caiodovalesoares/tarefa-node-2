import { prisma } from "@/lib/prisma";
import { Prisma, Post } from "@prisma/client";
import { PostUpdateInput } from "../posts-repository";

export class PrismaPostsRepository {
    async findMostCommentedPosts(limit: number = 5): Promise<Post[]> {
        return await prisma.post.findMany({
            where: {
                deleted_at: null,
            },
            include: {
                _count: {
                    select: { comentarios: true },
                },
            },
            orderBy: {
                comentarios: {
                    _count: "desc",
                },
            },
            take: limit,
        }).then(posts =>
            posts.map(post => ({
                ...post,
                comentariosCount: post._count.comentarios,
            }))
        )
    }

    async findMostRecentPosts(limit: number = 5): Promise<Post[]> {
        return await prisma.post.findMany({
            where: {
                deleted_at: null,
            },
            orderBy: {
                data: "desc",
            },
            take: limit,
        })
    }

    async findByKeyWord(keyWord: string): Promise<Post[]> {
        return await prisma.post.findMany({
            where: {
                deleted_at: null,
                OR: [
                    { titulo: { contains: keyWord, mode: "insensitive" } },
                    { conteudo: { contains: keyWord, mode: "insensitive" } }
                ]
            },
            orderBy: {
                data: "desc"
            }
        })
    }

    async permanentDelete(): Promise<void> {
        const THIRTY_DAYS_AGO = new Date()
        THIRTY_DAYS_AGO.setDate(THIRTY_DAYS_AGO.getDate() - 30)

        await prisma.post.deleteMany({
            where: {
                deleted_at: {
                    lte: THIRTY_DAYS_AGO
                }
            }
        })
    }

    async findMostLikedPosts(limit: number = 10): Promise<(Post & { likesCount: number })[]> {
        return await prisma.post.findMany({
            where: {
                deleted_at: null,
            },
            include: {
                _count: {
                    select: { like: true },
                },
            },
            orderBy: {
                like: {
                    _count: "desc",
                },
            },
            take: limit,
        }).then(posts =>
            posts.map(post => ({
                ...post,
                likesCount: post._count.like,
            }))
        )
    }

    async findUserByPostId(postId: string): Promise<Post & { user: { email: string; nome: string } } | null> {
        return prisma.post.findUnique({
            where: { 
                id: postId,
                deleted_at: null
            },
            include: {
                user: {
                    select: { email: true, nome: true }
                }
            }
        })
    }

    async findByUserId(userId: string): Promise<Post[]> {
        return await prisma.post.findMany({
            where: { 
                userId,
                deleted_at: null 
            },
        })
    }

    async update(id: string, data: PostUpdateInput): Promise<Post | null> {
            const post = await prisma.post.update({
                where: { id }, 
                data: {
                    titulo: data.titulo,
                    conteudo: data.conteudo,
                    data: data.data,
                    userId: data.userId,
                    deleted_at: data.deleted_at
            }
            })
            return post
        }

    async softDelete(id: string): Promise<Post | null> {
            const post = await prisma.post.update({
                where: {
                    id
                },
                data: {
                    deleted_at: new Date()
                }
            })
            return post
        }

    async findById(id: string): Promise<Post | null> {
        return await prisma.post.findUnique({
            where: {
                id
            }
        })
    }

    async getAll(page: number, pageSize: number): Promise<Post[]> {
        const skip = (page - 1) * pageSize
        const take = pageSize

        return await prisma.post.findMany({
            where: {
                deleted_at: null
            },
            skip,
            take,
            orderBy: {
                data: "desc"
            }
        }) 
    }

    async create(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
        try {
            const post = await prisma.post.create({
                data
            })
            return post
        } catch (error) {
            console.error("Erro criando post:", error)
            throw new Error("Erro ao criar post")
        }
    }
}