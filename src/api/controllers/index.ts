import { Customer } from "./customer";
import PingController from "./ping";

export const CONTROLLERS = [
    new PingController(),
    new Customer()
];