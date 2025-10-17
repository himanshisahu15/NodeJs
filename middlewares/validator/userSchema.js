import Joi from "joi";
import { Op } from "sequelize";
import User from '../../models/userModel.js'
export const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required(),

  email: Joi.string()
    .email()
    .min(3)
    .max(30)
    .required().external(async (value, helpers) => {
      const id = helpers.prefs.context.id;
      const existingUser = await User.findOne({ where: { email: value, userId: { [Op.ne]: id } } });
      if (existingUser) {
        throw new Error("Email already exist");
      }
      return value;
    }),

  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{6,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 6 characters long, include at least one letter, one number, and one special character.",
      "string.empty": "Password is required",
    }),

  role: Joi.string()
    .valid("admin", "user")
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


//FOR MAKING FIELDS OPTIONAL FOR ADMIN
// department: Joi.string().when('role', {
//     is: 'admin',
//     then: Joi.optional(),      // optional for admin
//     otherwise: Joi.required()  // required for non-admin
//   }),