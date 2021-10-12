import "reflect-metadata";
import * as restify from "restify";
import { Server } from "restify";
import { injectable, container } from "tsyringe";
import dotenv from "dotenv";

@injectable()
export default class App {
  private server: Server;
  private port!: number;

  constructor() {
    dotenv.config();
    this.server = restify.createServer({
      name: "CabudareWireless",
      version: "1.0.0",
    });

    this.port = <number><any>((process.env.PORT || process.env.LOCAL_PORT));
  }

  public start() {
    // Middleware
    this.server.use(restify.plugins.queryParser());
    this.server.use(restify.plugins.bodyParser());

    this.server.listen(this.port, () => {
      console.log(
        `Server running on port ${this.port} in mode ${process.env.ENVIRONMENT}`
      );
    });
  }

  public stop() {
    this.server.close(() => `Closing the server......`);
  }
}

const app = container.resolve(App);
app.start();

process.on("SIGINT", () => {
  app.stop();
  process.exit(0);
});
