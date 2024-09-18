import Joi from "joi";
import { ThreadDTO } from "../../dto/thread-dto";

export const createThreadScehma = Joi.object<ThreadDTO>({
    content: Joi.string(),
    image: Joi.string().optional().allow(null, ''),
    likes: Joi.number(),
    userId: Joi.number(),
    createdAt: Joi.date(),
})

