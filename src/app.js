import express from 'express';
import dotenv from 'dotenv';
import routes from '../routes/userRoute.js'
import { connectDb, sequelize } from '../config/db.js'
import { handleError } from '../middleware/exceptionMiddleware.js';
dotenv.config();
const app = express();

app.use(express.json());

app.use('/', routes);
app.use(handleError);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await connectDb();
        await sequelize.sync();
        console.log("Database connection sync")
    } catch (err) {
        console.log("Database not sync", err)
    }
    console.log(`server started at http://localhost:${PORT}`);
})