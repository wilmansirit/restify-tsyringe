import restify, { Server } from "restify";
import { inject, singleton } from "tsyringe";
import dotenv from "dotenv";
import Middlewares from "../middlewares";

@singleton()
export default class ApiServer {
  server: Server;
  port!: number;

  constructor(@inject(Middlewares) private middlewares: Middlewares) {
    dotenv.config();

    this.middlewares = middlewares;
    this.server = restify.createServer();

    this.port = <number>(<any>(process.env.PORT || process.env.LOCAL_PORT));
  }

  public start() {
    // Middleware
    this.middlewares.init(this.server);

    // Listening port......
    this.server.listen(this.port, () => {
      console.log(
        `[Server running] on port ${this.port} in mode ${process.env.ENVIRONMENT}`
      );
    });
  }

  public stop() {
    this.server.close(() => `Closing the server......`);
  }
}
