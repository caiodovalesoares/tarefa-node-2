import { FastifyInstance } from "fastify";
import { createLike } from "@/http/controllers/likes/create";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { deleteLike } from "./delete";
import { get } from "./get";
import { getLikesByUser } from "./get-by-user";

export async function likeRoutes(app: FastifyInstance) {
    app.post('/likes', {onRequest: [verifyJWT]}, createLike)

    app.delete('/likes/:likeId', {onRequest: [verifyJWT]}, deleteLike)

    app.get('/likes/:likeId', get)
    app.get('/users/:userId/likes', getLikesByUser)
}