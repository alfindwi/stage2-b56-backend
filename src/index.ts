import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import { helloController } from './contollers/hello-controller';
import { uploadFile } from './middlewares/upload-file';
import { error } from 'console';
import { errorHandler } from './middlewares/error';

dotenv.config();

const app : Express = express();
const port = process.env.PORT || 4000;

app.get("/", uploadFile ,helloController )

app.use(errorHandler)


app.listen(port, () => {
    console.log(`berjalan di port ${port}`)
})