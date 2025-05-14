import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository, UserUpdateInput } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository{
    async uploadImage(id: string, data: UserUpdateInput): Promise<User | null> {
        try {
            const existingUser = await prisma.user.findUnique({
                where: { id },
            });
    
            if (!existingUser) {
                throw new Error("Usuário não encontrado.");
            }
    
            const updatedUser = await prisma.user.update({
                where: { id },
                data: {
                    foto: data.foto,
                },
            });
    
            return updatedUser;
        } catch (error) {
            console.error("Erro ao atualizar a imagem do usuário:", error);
            throw new Error("Não foi possível atualizar a imagem do usuário.");
        }
    }

    async getAll(): Promise<User[]> {
        return await prisma.user.findMany() 
    }

    async update(id: string, data: UserUpdateInput): Promise<User | null> {
        const user = await prisma.user.update({
            where: { id }, 
            data: {
                nome: data.nome,
                email: data.email,
                senha: data.senha
        }
        })
        return user
    }

    async delete(id: string): Promise<User | null> {
        const user = await prisma.user.delete({
            where: {
                id
            }
        })
        return user
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })
        return user
    }
}