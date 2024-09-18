import dotenv from 'dotenv';
import express, { Express } from 'express';
import { routerV1 } from './routes/users/users';
import swaggerUI from "swagger-ui-express"
import swaggerDocument from "../swagger/swagger-output.json"

dotenv.config();

const app : Express = express();
app.use(express.json());
const port = process.env.PORT || 4000;
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.get("/", (req, res) => {
    const {accessToken} = req.query

    res.json({accessToken})
})

app.use("/api/v1", routerV1)




app.listen(port, () => {
    console.log(`berjalan di port ${port}`)
})