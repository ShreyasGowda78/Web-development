// to generate controllers for student details controller 

import Student from '../models/s.model.js';

export const createStudent = async (req, res) => {
    try {
        const { name, age, grade } = req.body;
        if (!name || !age || !grade) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newStudent = await Student.create({ name, age, grade });
        res.status(201).json({ message: 'Student created successfully', student: newStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error: error.message });
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ message: 'Students retrieved successfully', students });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving students', error: error.message });
    }
};

