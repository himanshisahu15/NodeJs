import Joi from "joi";

export const orderItemSchema = Joi.object({
    orderId: Joi.number()
        .integer()
        .required(),

    productId: Joi.number()
        .integer()
        .required(),

    quantity: Joi.number()
        .integer()
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