import Joi from "joi";

export const productSchema = Joi.object({
    categoryId: Joi.number()
        .integer()
        .required(),

    name: Joi.string()
        .min(3)
        .max(20)
        .required(),

    description: Joi.string()
        .min(5)
        .max(100)
        .required(),

    price: Joi.number()
        .precision(2)
        .required(),

    createdBy: Joi.string()
        .min(3)
        .max(20)
        .optional(),

    updatedBy: Joi.string()
        .min(3)
        .max(20)
        .optional()
})