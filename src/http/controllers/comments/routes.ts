import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { create } from "./create";
import { FastifyInstance } from "fastify";
import { getAll } from "./get-all";
import { deleteComment } from "./delete";
import { update } from "./update";
import { get } from "./get";
import { getCommentsByUser } from "./get-by-user";
import { getCommentsByPost } from "./get-by-post";

export function commentRoutes(app: FastifyInstance) {
    app.post('/comments', {onRequest: [verifyJWT]}, create)

    app.get('/comments/:commentId', get)
    app.get('/comments', getAll)
    app.get('/users/:userId/comments', getCommentsByUser)
    app.get('/posts/:postId/comments', getCommentsByPost)

    app.delete('/comments/:commentId', {onRequest: [verifyJWT]}, deleteComment)

    app.patch('/comments/:commentId', {onRequest: [verifyJWT]}, update)
}