import { app } from "./app";
import { env } from "./env/index";
import "@/jobs/weekly-emails";
import "@/jobs/clean-deleted-items";

app.listen({
    host: '0.0.0.0',
    port: env.PORT
}).then(() => {
    console.log("Server is running on port 5432")
})