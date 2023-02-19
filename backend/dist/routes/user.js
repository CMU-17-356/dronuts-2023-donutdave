import { Router } from 'express';
import { createUser, getUsers } from '../controllers/user.js';
var userRouter = Router();
userRouter.post('/user', createUser);
userRouter.get('/users', getUsers);
export { userRouter };
