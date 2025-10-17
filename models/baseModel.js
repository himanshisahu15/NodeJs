
import { Model } from "sequelize";
import bcrypt from "bcrypt";

export default class BaseModel extends Model {
  static init(attributes, options) {
    const defaultHooks = {
      beforeCreate: async (instance, options) => {
        // Handle createdBy / updatedBy
        const user = options.currentUser ? options.currentUser.name : "system";
        instance.createdBy = user;
        instance.updatedBy = user;

        // Handle password hashing if instance has password
        if (instance.password) {
          const salt = await bcrypt.genSalt(10);
          instance.password = await bcrypt.hash(instance.password, salt);
        }
      },
      beforeUpdate: async (instance, options) => {
        if (options.currentUser) {
          instance.updatedBy = options.currentUser.name;
        }
        if (instance.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          instance.password = await bcrypt.hash(instance.password, salt);
        }
      }
    };

    options.hooks = { ...defaultHooks, ...options.hooks };
    super.init(attributes, options);
  }
}

















// import { Model } from "sequelize";

// export default class BaseModel extends Model {
//   static init(attributes, options) {
//     const defaultHooks = {
//       //run before new record is inserted into db
//       beforeCreate: (instance, hookOptions) => {
//         const currentUser = hookOptions.user;
//         if (currentUser) {
//           instance.createdBy = currentUser.name;
//           instance.updatedBy = currentUser.name;
//         }
//       },
//       beforeUpdate: (instance, hookOptions) => {
//         const currentUser = hookOptions.user;
//         if (currentUser) {
//           instance.updatedBy = currentUser.name;
//         }
//       }
//     };
// //merge default hook with custom hook
//     options.hooks = { ...defaultHooks, ...options.hooks };
//     super.init(attributes, options);
//   }
// }


// import { Model } from "sequelize";

// export default class BaseModel extends Model {
//   static init(attributes, options) {
//     const defaultHooks = {
//       beforeCreate: (instance, options) => {
//         if (options.currentUser) {   //  use currentUser instead of user
//           instance.createdBy = options.currentUser.email;  // better to use email
//           instance.updatedBy = options.currentUser.email;
//         }
//       },
//       beforeUpdate: (instance, options) => {
//         if (options.currentUser) {
//           instance.updatedBy = options.currentUser.email;
//         }
//       }
//     };

//     options.hooks = { ...defaultHooks, ...options.hooks };
//     super.init(attributes, options);
//   }
// }


