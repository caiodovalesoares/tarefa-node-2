import fastify from "fastify";
import { userRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import { postRoutes } from "./http/controllers/posts/routes";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { env } from "./env";
import fastifyCors from "@fastify/cors";
import { commentRoutes } from "./http/controllers/comments/routes";
import { likeRoutes } from "./http/controllers/likes/routes";
import fastifyMultipart from "@fastify/multipart";

export const app = fastify()

app.register(fastifyMultipart)

app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
})

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(postRoutes)
app.register(commentRoutes)
app.register(likeRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error) {
        console.log(error)
    }
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: 'Erro de validação', issues: error.format()})
    }
    return reply.status(500).send({ message: 'Erro interno no servidor'})
})