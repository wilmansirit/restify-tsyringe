import { Request, Response, Next } from "restify";
import { HttpServer } from "../server/httpServer";
import { Controller } from "./controller";

export default class PingController implements Controller{

    initialize(httpServer: HttpServer): void {
        
        httpServer.get('/ping', (req: Request, res: Response, next: Next) => {
            res.send(200, {message: "pong"});
            next();
        })
    }
  
}