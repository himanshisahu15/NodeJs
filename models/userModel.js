import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbConnection.js";
import bcrypt from 'bcrypt';
import BaseModel from "./baseModel.js";


class User extends BaseModel {
  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init({
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
    allowNull: false
  },
  createdBy: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  updatedBy: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: "users",
  timestamps: true,
  // hooks: {
  //   beforeCreate: async (user, options) => {
  //     const salt = await bcrypt.genSalt(10);
  //     user.password = await bcrypt.hash(user.password, salt);
  //     if (options.user) {
  //       user.createdBy = "system";
  //       user.updatedBy = options.user.name;
  //     }
  //   },
  //   beforeUpdate: async (user, options) => {
  //     if (user.changed("password")) {
  //       const salt = await bcrypt.genSalt(10);
  //       user.password = await bcrypt.hash(user.password, salt);
  //     }
  //     if (options.user) {
  //       user.updatedBy = options.user.name;
  //     }
  //   }
  // }
})


export default User
