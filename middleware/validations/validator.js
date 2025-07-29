import Joi from "joi";

const city=Joi.object({
    city:Joi.string()
      .pattern(/^[a-zA-Z\s]+$/)
    .min(3)
    .max(30)
    .required()
     .messages({
      'string.empty': 'City name is required.',
      'string.min': 'City name must be at least 3 characters.',
      'string.max': 'City name must be under 30 characters.',
      'string.pattern.base': 'City name must only contain letters and spaces.'
    })
})

export const validateCity=(input)=> {
    const result=city.validate({city:input}, { abortEarly: false });
    return result;
}