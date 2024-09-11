import { Request, Response, NextFunction } from "express";

export function uploadFile(req: Request, res: Response, next: NextFunction) {
    // proses mengamankan data user

    const secret = req.headers.authorization = "gblhtw";

    if (secret !== "gblhtw") {
        return res.json({
            message: "anda tidak diizinkan masuk", 
            status: res.sendStatus(401)
        })
    }
    next();
}