// to generate controllers for student details models

import mongoose from 'mongoose';


const sSchema = new mongoose.Schema({
    name: {
        type: String,   
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Student = mongoose.model('Student', sSchema);
export default Student;