import express from "express";
import pino from "pino-http";
import cors from "cors";
import { getAllContacts, getContactById } from "./services/contacts.js";

const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.get("/contacts", async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      message: "Mongo connection successfully established!",
      data: contacts,
    });
  });

  app.get("/contacts/:contactId", async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: "Contact not found",
      });
      return;
    }
    res.send({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );

  app.use("*", (req, res, next) => {
    res.status(404).json({
      message: "Not found",
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
