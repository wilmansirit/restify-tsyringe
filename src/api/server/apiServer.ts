import restify, { Server, RequestHandler, Request, Response, Next } from "restify";
import { inject, injectable, container, singleton } from "tsyringe";
import dotenv from "dotenv";
import Middlewares from "../middlewares";
import HttpRouter from "../routes/httpRouter";


@singleton()
export default class ApiServer {

  server: Server;
  port!: number;

  constructor(
    @inject(Middlewares) private middlewares: Middlewares,
    //@inject(HttpRouter)  private httpRouter: HttpRouter     
  ) {

    dotenv.config();

    this.middlewares = middlewares;
    this.server = restify.createServer();

    this.port = <number>(<any>(process.env.PORT || process.env.LOCAL_PORT));
  }


  public start() {
    // Middleware
    //container.resolve(Middlewares).init(this.server)
    this.middlewares.init(this.server);

    // Add Controllers
    //container.resolve(HttpRouter).addControllers()
    //this.httpRouter.addControllers();

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
