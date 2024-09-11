import { Request, Response, NextFunction } from "express";

export function uploadFile(req: Request, res: Response, next: NextFunction) {
    // upload file dengan multer

    // uplaod file clouding
    console.log("upload file success")
    next();
}