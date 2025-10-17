import Joi from 'joi';

export const schema = Joi.object({
    id: Joi.number().required(),
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    age: Joi.number().integer().min(0).max(120).required(),
    city: Joi.string().allow("").optional()
})
