import { isTesting } from "./utils/isTesting.ts";
import { client } from "./db/client.ts";
import { dropData } from "./db/drop-data.ts";
import { Application } from "./dependencies.ts";
import { apiEndpoint } from "./utils/constants.ts";
import { routers } from "./routers.ts";

const isTest = isTesting();
console.log(`Running in ${isTest ? "test" : "development"} mode`);

await client.connect();

if (isTest) await dropData();

const app = new Application({ port: 4000, hostname: "localhost" });

routers.forEach(({ endpoint, router }) => {
  app.use(`${apiEndpoint}/${endpoint}`, router);
});

await app.run();
