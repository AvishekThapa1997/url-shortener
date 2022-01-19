import dotnev from "dotenv";
dotnev.config();
import express from "express";
import * as fs from "fs";
import * as path from "path";
import mainRouter from "./routes/main-router.js";
import * as mainController from "./controller/main-controller.js";
import get404 from "./controller/404.js";
import __rootDirName from "./rootDirectory.js";
import helmet from "helmet";
import sequelize from "./utils/db/dbSetup.js";
import morgan from "morgan";
const app = express();
const accessLogStream = fs.createWriteStream(
  path.join(__rootDirName, "access.log"),
  {
    flags: "a",
  }
);
app.use(express.json());
app.use(
  morgan("combined", {
    stream: accessLogStream,
  })
);
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
app.use("/api", mainRouter);
app.use("/:shortUrl", mainController.redirectURL);
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({
    message: err.message,
  });
});
app.use(get404);
sequelize.sync().then(() => {
  app.listen(process.env.PORT);
});
