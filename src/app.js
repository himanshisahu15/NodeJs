import express from 'express';
import sequelize from '../config/dbConnection.js';
import mainRouter from '../route/mainRoute.js'
import '../models/relation.js';
import requestLogger from '../middlewares/logger/requestLogger.js';
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);


app.use('/api',mainRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await sequelize.sync();
        console.log("Database Synchronised");
    } catch (error) {
        console.log("Synchronization error", error);
    }
    console.log(`Server started at http://localhost:${PORT}`);
})

export default app;


