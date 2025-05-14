-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "imagem" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "foto" DROP NOT NULL;
