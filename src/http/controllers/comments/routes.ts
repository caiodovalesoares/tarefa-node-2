import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { create } from "./create";
import { FastifyInstance } from "fastify";

export function commentRoutes(app: FastifyInstance) {
    app.post('/comments', {onRequest: [verifyJWT]}, create)
}