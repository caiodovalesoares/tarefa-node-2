import { prisma } from "@/lib/prisma";

export class UploadUserImageUseCase {
    async execute(userId: string, file: Express.Multer.File): Promise<string> {
        if (!file) {
            throw new Error("Nenhum arquivo enviado.");
        }

        // Verifica se o usuário existe
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        // Caminho do arquivo salvo
        const filePath = file.path;

        // Atualiza o caminho da imagem no banco de dados
        await prisma.user.update({
            where: { id: userId },
            data: { foto: filePath },
        });

        return filePath;
    }
}