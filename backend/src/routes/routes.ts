import { Router } from 'express';
import { getUsers, createUser, getUserByUsername, deleteUserByUsername } from '../controllers/user.js'

const router = Router()

router.get('/users', getUsers)
router.post('/users', createUser)
router.get('/users/:username', getUserByUsername)
router.delete('/users/:username', deleteUserByUsername)
// TODO: update user

export { router }