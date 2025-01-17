import { initMongoConnection } from "./db/initMongoConnection.js";
import { setupServer } from "./server.js";
import dotenv from "dotenv";
dotenv.config();

const bootstrap = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (err) {
    console.error(err);
  }
};

bootstrap();
