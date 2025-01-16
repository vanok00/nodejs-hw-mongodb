import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

export async function initMongoConnection() {
  await mongoose.connect(connectionURI);
  console.log("Mongo connection successfully established!");
}
