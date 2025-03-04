import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { create } from "./create";
import { FastifyInstance } from "fastify";
import { getAll } from "./get-all";
import { deleteComment } from "./delete";

export function commentRoutes(app: FastifyInstance) {
    app.post('/comments', {onRequest: [verifyJWT]}, create)

    app.get('/comments', getAll)

    app.delete('/comments/:commentId', {onRequest: [verifyJWT]}, deleteComment)
}