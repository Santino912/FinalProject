import cors from "cors";
import express, { Request } from "express";
import router from "./routes/index";
import "./database/index"


const { PORT } = process.env

const app = express()

app.use(express.json());
app.use(cors<Request>())

app.use("/", router)

app.listen(PORT, () => {
    console.log(`Server Started in http://localhost:${PORT}`);
});