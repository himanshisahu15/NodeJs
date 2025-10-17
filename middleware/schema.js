import Joi from 'joi';


const schema = Joi.object({
    student_name: Joi.string().min(3).max(10).required(),

    email: Joi.string().email().required(),

    address: Joi.string().required()
})

export default schema;