// To create routes for bike details
import express from 'express';
import Bike from '../models/e.model.js';    
import { createBike, getAllBikes, deleteBike } from '../controllers/e.controllers.js';

const router = express.Router();
router.post('/create', createBike);

router.get('/', getAllBikes);

router.delete('/:id', deleteBike);

export default router;
