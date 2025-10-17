import Joi from "joi";

export const categorySchema= Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required(),

  description:Joi.string()
  .min(5)
  .max(100)
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