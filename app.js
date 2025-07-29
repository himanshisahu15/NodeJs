import express from 'express'


import weatherRoutes from './routes/weatherRoutes.js';


const app=express();

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Weather API is running! Use /api/weather?cityName=London');
});
app.use('/api',weatherRoutes);
export default app