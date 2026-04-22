import express from 'express';

import {connectDB} from './database/connection.js';    
import dotenv from 'dotenv'
dotenv.config()

import User from './routes/user.routes.js';
import Bike from './routes/e.routes.js';
import Game from './routes/game_routes.js';
import Student from './routes/s.routes.js';

const PORT = process.env.PORT || 3000;

const app =express();
app.use(express.json());


app.get('/',(req,res) => {
    res.status(200).json({message: 'Hello World!'});
})

app.use('/api/v1/users', User);
app.use('/api/v1/bikes', Bike);
app.use('/api/v1/games', Game);
app.use('/api/v1/students', Student);

app.listen(PORT,async()=>{
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});