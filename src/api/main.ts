import * as restify from "restify";
import { Server } from "restify";
import { injectable } from "tsyringe";
import dotenv from "dotenv";
import morgan from "morgan";

@injectable()
export default class Main {
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
    this.server.use(morgan("tiny"))



    // Requiring routes
    

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