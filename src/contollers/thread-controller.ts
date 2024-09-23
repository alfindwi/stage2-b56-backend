import { Request, Response } from "express";
import threadService from "../services/thread-service";
import { customError, customErrorCode } from "../types/error";
import { createThreadScehma } from "../utils/schema/thread-schema";

class ThreadController {
    
    async find(req: Request, res: Response) {
        try {
          const threads = await threadService.getAllThreads();
          res.json(threads);
        } catch (error) {
          res.status(500).json(error);
        }
      }
    

    async findById (req: Request, res: Response) {
        try {
            const {id} = req.params

        const thread = await threadService.getThreadById(Number(id));
        res.json({
            data: thread,
            message: "success search by Id"
        });  
        } catch (error) {
            res.status(500).json(error) 
        }
    }

    async create(req: Request, res: Response) {
        /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/CreateThreadDTO"
                        }  
                    }
                }
            } 
        */
    
        try {
          const value = await createThreadScehma.validateAsync(req.body);
    
          const threads = await threadService.createThread(value);
          res.json(threads);
        } catch (error) {
          res.status(500).json(error);
        }
      }

    async update(req: Request, res: Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UpdateThreadDTO"
                    }  
                }
            }
        } 
    */
        try {
            const thread = await threadService.updateThread(req.body);
            res.json(thread);
          } catch (error) {
            res.status(500).json(error);
          }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)

            const thread = await threadService.deleteThread(id);
            
            if(!thread) {
                throw {
                    status: 404,
                    message: "Thread not found!",
                    code: customErrorCode.USERS_NOT_EXIST
                } as customError   
            }

            res.json({
                thread,
                message: "success delete thread"
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    
}

export default new ThreadController()