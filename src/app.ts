import { envs } from "./config";
import { db } from "./data/Mongo/postgres-database";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  await db.sync({ force: false });

  const server = new Server({ port: envs.PORT, routes: AppRoutes.routes });
  server.start();

  console.log("Hola MUNDO");
}
