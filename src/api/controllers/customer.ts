import { Controller } from "./controller";
import { Routes } from "../routes/routes.interface";
import { Response, Request, Next } from "restify";


export class Customer implements Controller {

    public initialize(routes: Routes): void {

        routes.get("/customer", (req: Request, res: Response, next: Next) => {
            res.send(200, {message: "Customers List"});
        })

    }
}