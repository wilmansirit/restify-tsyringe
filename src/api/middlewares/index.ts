import * as restify from "restify";
import { Server, Router } from "restify";
import { injectable } from "tsyringe";
import morgan from "morgan";
import cors from "cors";


@injectable()
export default class Middlewares {

    private router! : Router;

    constructor(){};

    init(httpServer: Server){

        httpServer.use(restify.plugins.queryParser());
        httpServer.use(restify.plugins.bodyParser());
        httpServer.use(morgan("tiny"));
        httpServer.use(cors());

    }

}