import { Request, Response } from "express";
import userService from "../services/user-service";
import { customError, customErrorCode } from "../types/error";
import { createUserScehma , updateUserScehma} from "../utils/schema/create-users-schema";
import threadService from "../services/thread-service";
import { createThreadScehma } from "../utils/schema/create-thread-schema";

class threadController {
    async findThread (req: Request, res: Response) {
        try {
            const thread = await threadService.getAllThread();
            res.json(thread);
        } catch (error) {
            res.json(error)
        }
    }

    async post (req: Request, res: Response) {
        try {
            const {error, value} = await createThreadScehma.validate(req.body, {abortEarly: false});

            if(error) {
                const errorMessage = error.details.map(detail => detail.message);
                return res.status(400).json({message: errorMessage})
            }

            const users = await threadService.createThread(value);
            res.json({users});
        } catch (error) {
            res.json(error)
        }
    }



    
}

export default new threadController()