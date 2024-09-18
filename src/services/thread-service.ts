import { PrismaClient, Thread } from "@prisma/client"
import { customError, customErrorCode } from "../types/error"
import { ThreadDTO } from "../dto/thread-dto"

const prisma = new PrismaClient()

class threadService{
     async getAllThread() : Promise<Thread[]> {
      const threads = await prisma.thread.findMany()

      if(!threads) {
        throw {
          status: 404,
          message: "Thread not found!",
          code: customErrorCode.THREAD_NOT_EXIST
        } as customError
      }
        return threads
    }

    async createThread(thread: ThreadDTO){
     const threads = await prisma.thread.create({
       data: {
         ...thread
        }
     })
      return threads
    }
      
}

export default new threadService()