import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        benchmark:true,
    }
)

export const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database Connection has been established successfully")
    } catch (err) {
        console.log("Database not connected", err)
    }
}