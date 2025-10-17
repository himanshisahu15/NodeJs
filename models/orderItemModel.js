import { DataTypes ,Model} from "sequelize";
import sequelize from "../config/dbConnection.js";
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import BaseModel from "./baseModel.js";

class OrderItem extends BaseModel { }

OrderItem.init({
    orderItemId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderId:{
        type:DataTypes.INTEGER,
        allowNull:false,
       references:{
        model:Order,
        key:'orderId'
       }
    },
      productId:{
        type:DataTypes.INTEGER,
        allowNull:false,
       references:{
        model:Product,
        key:'pid'
       }
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    price:{
        type:DataTypes.DECIMAL(10,2),
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
    modelName:"OrderItem",
    tableName:"order_items",
    timestamps:true
})

export default OrderItem
