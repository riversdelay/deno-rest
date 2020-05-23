import "https://deno.land/x/dotenv/load.ts";
import { isTesting } from "./utils/isTesting.ts";
import { client } from "./db/client.ts";
import { dropData } from "./db/drop-data.ts";
import { Application } from "https://deno.land/x/denotrain@v0.4.4/mod.ts";
import { authorRouter } from "./routers/author.ts";
import { bookRouter } from "./routers/book.ts";

const isTest = isTesting();
console.log(`Running in ${isTest ? "test" : "development"} mode`);

await client.connect();

if (isTest) await dropData();

const app = new Application({ port: 4000, hostname: "localhost" });

app.use("/api/authors", authorRouter);
app.use("/api/books", bookRouter);

await app.run();
