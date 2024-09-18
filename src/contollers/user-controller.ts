import { Request, Response } from "express";
import userService from "../services/user-service";
import { customError, customErrorCode } from "../types/error";
import { createUserScehma , updateUserScehma} from "../utils/schema/create-users-schema";

class UserController {
    
    async find (req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
        res.json({data: users});  
        } catch (error) {
            res.json(error)
        }
    }

    async findById (req: Request, res: Response) {
        try {
            const {id} = req.params

        const users = await userService.getUserById(Number(id));
        res.json({
            data: users,
            message: "success search by Id"
        });  
        } catch (error) {
            res.json(error) 
        }
    }

    async findByEmail (req: Request, res: Response) {
        try {
            const email: string = req.params.email;
        const users = await userService.getUserByEmail(email);
        res.json({
            data: users,
            message: "success search by Email"
        });
        } catch (error) {
           res.json(error) 
        }
    }

    async findByFullName (req: Request, res: Response) {
        try {
            const fullName: string = req.params.fullName;
        const users = await userService.getUserByfullName(fullName);
        res.json({
            data: users,
            message: "success search by Fullname"
        });
        } catch (error) {
           res.json(error) 
        }
    }

    async create (req: Request, res: Response) {
        try {
            const {error, value} = await createUserScehma.validate(req.body, {abortEarly: false});

            if(error) {
                const errorMessage = error.details.map(detail => detail.message);
                return res.status(400).json({message: errorMessage})
            }

            const users = await userService.createUser(value);
            res.json({users});
        } catch (error) {
            res.json(error)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const {error, value} = await updateUserScehma.validate(req.body, {abortEarly: false});

            if(error) {
                const errorMessage = error.details.map(detail => detail.message);
                return res.status(400).json({message: errorMessage})
            }

            const users = await userService.updateUser(value);
            res.json(users);
          } catch (error) {
            res.json(error);
          }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)

            const users = await userService.deleteUser(id);
            
            if(!users) {
                throw {
                    status: 404,
                    message: "User not found!",
                    code: customErrorCode.USERS_NOT_EXIST
                } as customError   
            }

            res.json({
                users,
                message: "success delete user"
            })
        } catch (error) {
            res.json(error)
        }
    }
    
}

export default new UserController()