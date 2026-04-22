// to generate controllers for student details routes
import express from 'express';
import Student from '../models/s.model.js'; 
import { createStudent, getAllStudents } from '../controllers/s.controllers.js';


const router = express.Router();

router.post('/create', createStudent);
router.get('/all', getAllStudents);

export default router;