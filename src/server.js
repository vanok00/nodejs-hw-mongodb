import express from "express";
import pino from "pino-http";
import cors from "cors";
import router from "./routers/index.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import { getEnvVar } from "./utils/getEnvVar.js";
import { UPLOAD_DIR } from "./constants/index.js";

const PORT = Number(getEnvVar("PORT", "3001"));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use("/uploads", express.static(UPLOAD_DIR));
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
    })
  );
};

export const setupServer = () => {
  const app = express();
  app.use(cookieParser());

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );

  app.get("/", (req, res) => {
    res.json({
      message: "Hello World!",
    });
  });

  app.use(router);

  app.use("*", notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
