import "reflect-metadata"
import { container } from "tsyringe";
import  Main from "./main";

const app = container.resolve(Main);
app.start();

process.on("SIGINT", () => {
  app.stop();
  process.exit(0);
});