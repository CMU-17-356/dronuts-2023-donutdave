import { Router } from 'express';
import { getUsers, createUser, getUserByUsername, updateUserByUsername, deleteUserByUsername } from '../controllers/users.js'

const router = Router()

router.get('/users', getUsers)
router.post('/users', createUser)
router.get('/users/:username', getUserByUsername)
router.delete('/users/:username', deleteUserByUsername)
router.patch('/users/:username', updateUserByUsername)

export { router }