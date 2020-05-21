import "https://deno.land/x/dotenv/load.ts";
import { Application } from "https://deno.land/x/denotrain@v0.4.0/mod.ts";
import { bookRouter } from "./routers/book.ts";
import { client } from "./db/client.ts";
import { isTesting } from "./utils/isTesting.ts";
import { dropData } from "./db/drop-data.ts";

const isTest = isTesting();
console.log(`Running in ${isTest ? "test" : "development"} mode`);

await client.connect();

if (isTest) await dropData();

const app = new Application({ port: 4000 });

app.use("/api/books", bookRouter);

await app.run();
