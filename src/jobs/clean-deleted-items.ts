import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository';
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository';
import cron from 'node-cron';

export async function cleanDeletedItems() {
    const prismaCommentsRepository = new PrismaCommentsRepository()
    const prismaPostsRepository = new PrismaPostsRepository()

    console.log('Iniciando limpeza de itens deletados...')

    await prismaCommentsRepository.permanentDelete()
    await prismaPostsRepository.permanentDelete()

    console.log('Itens removidos permanentemente!')

    console.log('Limpeza concluída!')
}

cron.schedule("0 3 * * 1", async () => {
    console.log("Executando tarefa semanal de limpeza de itens deletados...")
    await cleanDeletedItems()
})