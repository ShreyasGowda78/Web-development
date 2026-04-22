import express from 'express';
import Game from '../models/gameModels.js';
import { AddGameResult } from '../controllers/game_controllers.js';


const router = express.Router();


router.post('/add', AddGameResult);

export default router;