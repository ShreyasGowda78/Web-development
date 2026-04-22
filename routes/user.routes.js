import express from 'express';  
import { registerUser, getAllUsers, deleteUser, updateUser, login } from '../controllers/user.controllers.js';
import { protect, isAdmin } from '../middlewares/authMid.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);

router.get('/', protect, isAdmin, getAllUsers);
router.put('/:email', protect, updateUser);
router.delete('/:email', protect, isAdmin, deleteUser);

export default router;