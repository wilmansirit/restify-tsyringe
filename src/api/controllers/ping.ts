import { Request, Response, Next } from "restify";
import { Routes } from "../routes/routes.interface";
import { Controller } from "./controller";

export default class PingController implements Controller{

    initialize(routes: Routes): void {
        
        routes.get('/ping', (req: Request, res: Response, next: Next) => {
            res.send(200, {message: "pong"});
            next();
        })
    }
  
}