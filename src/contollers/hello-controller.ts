import { Request, Response } from "express";
import { sayHello, sayHellov2 } from "../services/hello-service";
import BadRequestError from "../errors/bad-request";

export function helloController(req: Request, res: Response) {
    const hello = sayHello();
    const hellov2 = sayHellov2();
    throw new BadRequestError({code: 400, message: "Bad request", logging: true})
    res.send(`${hello} ${hellov2}`);    
}