import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from "../services/contacts.js";
import createHttpError from "http-errors";

export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();

    res.json({
      status: 200,
      message: "Mongo connection successfully established!",
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, "Contact not found");
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

// export async function createContactController(req, res) {
//   const contact = {
//     name: req.body.name,
//     phoneNumber: req.body.phoneNumber,
//     email: req.body.email,
//     isFavourite: req.body.isFavourite,
//     contactType: req.body.contactType,
//   };

//   const newContact = await createContact(contact);

//   res.status(201).json({
//     status: 201,
//     message: "Successfully created a contact!",
//     data: newContact,
//   });
// }
export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  res.status(204).send();
};

export async function patchContactController(req, res, next) {
  const { contactId } = req.params;

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const updatedContact = await updateContact(contactId, contact);

  if (!updatedContact) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  res.json({
    status: 200,
    message: "Successfully patched a student",
    data: updatedContact,
  });
}
