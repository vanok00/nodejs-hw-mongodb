import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.base": "Username should be a string",
    "string.min": "Username should have at least {#limit} characters",
    "string.max": "Username should have at most {#limit} characters",
    "any.required": "Username is required",
  }),
  email: Joi.string().email().min(3).max(30).required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{6,16}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must contain 6-16 digits and can start with +",
      "any.required": "Phone number is required",
    }),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      "any.only": "Contact type must be one of work, home, or personal",
      "any.required": "Contact type is required",
    })
    .valid("work", "home", "personal"),
  isFavourite: Joi.boolean().required().messages({
    "any.required": "isFavourite is required",
  }),
});

const dataToValidate = {};

// const dataToValidate = {
//   name: "John Doe",
//   phoneNumber: "23131313",
//   email: "john.doe@example.com",
//   isFavourite: false,
//   contactType: "work",
// };

const validationResult = createContactSchema.validate(dataToValidate);
if (validationResult.error) {
  console.error(validationResult.error.message);
} else {
  console.log("Data is valid!");
}

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email().min(3).max(30),
  phoneNumber: Joi.string().min(6).max(16),
  gender: Joi.string().valid("male", "female", "other").min(3).max(20),
  contactType: Joi.string().valid("work", "home", "personal").min(3),
  isFavourite: Joi.boolean(),
});
