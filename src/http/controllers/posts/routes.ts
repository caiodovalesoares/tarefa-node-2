import { create } from "./create";
import { FastifyInstance } from "fastify";
import { getAll } from "./get-all";
import { get } from "./get";
import { deletePost } from "./soft-delete";
import { update } from "./update";
import { getPostsByUser } from "./get-by-user";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { getPostsByKeyWord } from "./get-by-key-word";

export function postRoutes(app: FastifyInstance) {
    app.post('/posts', {onRequest: [verifyJWT]} , create)

    app.get('/posts/:postId', get)
    app.get('/posts', getAll)
    app.get('/users/:userId/posts', getPostsByUser)
    app.get('/posts/search', getPostsByKeyWord)

    app.delete('/posts/:postId', {onRequest: [verifyJWT]}, deletePost)

    app.patch('/posts/:postId', {onRequest: [verifyJWT]}, update)
}