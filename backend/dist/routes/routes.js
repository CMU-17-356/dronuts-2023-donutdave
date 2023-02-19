import { Router } from 'express';
import { createUser, getUsers } from '../controllers/user.js';
var router = Router();
router.post('/users', createUser);
router.get('/users', getUsers);
export { router };
