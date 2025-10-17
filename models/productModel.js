import { DataTypes ,Model} from "sequelize";
import sequelize from "../config/dbConnection.js";
import Category from '../models/categoryModel.js'
import BaseModel from "./baseModel.js";

class Product extends BaseModel { }

Product.init({
    pid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoryId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        //refenential integrity-used to make F.K constraint.we cannot insert values that don’t exist in Category.
       references:{
        model:Category,
        key:'cid'
       }
    },
    name:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
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
    modelName:"Product",
    tableName:"products",
    timestamps:true
})

export default Product
