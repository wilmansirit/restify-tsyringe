import { Routes } from "../routes/routes.interface";

export interface Controller {
  initialize(routes: Routes): void;
}
