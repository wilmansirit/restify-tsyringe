import "reflect-metadata"
import { container } from "tsyringe";
import HttpRouter from "./api/routes/httpRouter";
import  ApiServer from "./api/server/apiServer";

const app = container.resolve(ApiServer);
container.resolve(HttpRouter).addControllers();

app.start();

process.on("SIGINT", () => {
  app.stop();
  process.exit(0);
});