import { config } from "dotenv";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import router from "./routes/products";
config();
const app: Application = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
  );
  next();
});
app.use(cors<Request>());

app.get("/", (req: Request, res: Response) => {
  res.json("Express server with TypeScript");
});

app.use("/api", router);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
