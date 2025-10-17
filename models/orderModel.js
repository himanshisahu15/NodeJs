import { DataTypes ,Model} from "sequelize";
import sequelize from "../config/dbConnection.js";
import User from '../models/userModel.js'
import BaseModel from "./baseModel.js";

class Order extends BaseModel { }

Order.init({
    orderId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        //refenential integrity-used to make F.K constraint.we cannot insert values that don’t exist in Category.
       references:{
        model:User,
        key:'userId'
       }
    },
    totalAmount:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM("pending","shipped","delivered","cancelled"),
         defaultValue: "pending",
        allowNull:false
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
},{
    sequelize,
    modelName:"Order",
    tableName:"orders",
    timestamps:true
})

export default Order
