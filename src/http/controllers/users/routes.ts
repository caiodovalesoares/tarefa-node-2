import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { get } from "./get";
import { deleteUser } from "./delete";
import { update } from "./update";
import { getAll } from "./get-all";
import { profile } from "./profile";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { refresh } from "./refresh";
import { uploadUserImage } from "./upload";

export function userRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/authenticate', authenticate)
    app.post('/users/upload', {onRequest: [verifyJWT], preHandler: uploadUserImage.preHandler}, uploadUserImage.handler)

    app.get('/users/:userId', get)
    app.get('/users', getAll)

    app.delete('/users/:userId', {onRequest: [verifyJWT]}, deleteUser)

    app.patch('/users/:userId', {onRequest: [verifyJWT]}, update)
    app.patch('/token/refresh', refresh)

    app.get('/profile', {onRequest: [verifyJWT]}, profile)
}