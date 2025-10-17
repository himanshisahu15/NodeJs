import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbConnection.js";
import BaseModel from "./baseModel.js";

class Category extends BaseModel { };

Category.init({
    cid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
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
},
    {
        sequelize,
        modelName: "Category",
        tableName: "categories",
        timestamps: true
    })

    export default Category