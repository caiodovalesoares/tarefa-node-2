import { Prisma, User } from "@prisma/client";

export interface UserUpdateInput {
    nome?: string
    email?: string
    senha?: string
    foto?: string
}

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: string): Promise<User | null>
    findById(userId: string): Promise<User | null>
    delete(id: string): Promise<User | null>
    update(id: string, data: UserUpdateInput): Promise<User | null>
    getAll(): Promise<User[]>
    uploadImage(id: string, data: UserUpdateInput): Promise<User | null>
}