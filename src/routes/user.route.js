import { Router } from 'express';
import { login, register, updateInfo } from '../controllers/user.controller.js';

const userRoutes = Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.put('/update/:id', updateInfo);


export default userRoutes;