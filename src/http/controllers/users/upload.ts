import { FastifyRequest, FastifyReply } from "fastify";
import { UploadUserImageUseCase } from "@/use-cases/upload-user-image-use-case";
import { upload } from "@/http/middlewares/multer-config";

declare module "fastify" {
    interface FastifyRequest {
        file: Express.Multer.File | undefined;
        user: { sub: string };
    }
}

export const uploadUserImage = {
    preHandler: upload.single("profileImage"),
    handler: async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            console.log("Arquivo recebido:", req.file);
            console.log("Usuário autenticado:", req.user);

            const file = req.file;
            if (!file) {
                return reply.status(400).send({ message: "Nenhuma imagem foi enviada" });
            }

            const userId = req.user?.sub;
            console.log("ID do usuário:", userId);

            const uploadUserImageUseCase = new UploadUserImageUseCase();
            const filePath = await uploadUserImageUseCase.execute(userId, file);

            return reply.status(200).send({ message: "Imagem de perfil atualizada com sucesso", filePath });
        } catch (error) {
            console.error("Erro ao realizar o upload da imagem:", error);
            return reply.status(500).send({ message: "Erro interno no servidor" });
        }
    },
};