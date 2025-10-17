import Joi from "joi";

export const orderSchema = Joi.object({
  userId: Joi.number()
  .integer()
    .required(),

  totalAmount:Joi.number()
  .precision(2)
  .required(),

  status:Joi.string()
   .valid("pending","shipped","delivered","cancelled")
  .required(),

  createdBy:Joi.string()
  .min(3)
  .max(20)
  .optional(),

   updatedBy:Joi.string()
  .min(3)
  .max(20)
  .optional()
})