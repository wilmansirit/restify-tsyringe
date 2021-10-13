import restify, { Next, Request, Response, Server } from "restify";
import { RequestHandler } from "restify";
import { inject, injectable } from "tsyringe";
import { CONTROLLERS } from "../controllers";
import ApiServer from "../server/apiServer";
import { HttpServer } from "../server/httpServer";
import { Methods } from "./methods"

@injectable()
export default class HttpRouter implements HttpServer{

    private server!: Server

    constructor(@inject(ApiServer) apiServer: ApiServer){
        this.server = apiServer.server;
    }


    public get(url: string, requestHandler: RequestHandler): void {
        this.addRoute('get', url, requestHandler);
    }

    private addRoute(method : Methods, url: string, requestHandler: RequestHandler) {
        this.server[method](url, async(req: Request, res: Response, next: Next) => {
            try {                

                await requestHandler(req, res, next);

            } catch (err) {
                console.log(err);
                res.send(500, err);                
            }
        })
        
        console.log(`[Added route] ${method.toUpperCase()} ${url}`);
    }

    public addControllers(): void {
        CONTROLLERS.forEach((controller) => controller.initialize(this));
    }

}