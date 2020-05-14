import "https://deno.land/x/dotenv/load.ts";
import { Application } from "https://deno.land/x/denotrain@v0.4.0/mod.ts";
import { bookRouter } from "./routers/book.ts";
import { client } from "./client.ts";

await client.connect();

const app = new Application({ port: 4000 });

app.use("/api/books", bookRouter);

await app.run();
