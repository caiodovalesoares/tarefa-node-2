import { app } from "./app";
import { env } from "./env/index";
import "@/jobs/weekly-emails";
import "@/jobs/clean-deleted-items";
import fastifyStatic from "@fastify/static";
import path from "path";

app.listen({
    host: '0.0.0.0',
    port: env.PORT
}).then(() => {
    console.log("Server is running on port 5432")
})

app.register(fastifyStatic, {
    root: path.join(__dirname, "../uploads"),
    prefix: "/uploads/",
})