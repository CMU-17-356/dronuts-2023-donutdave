import { Router } from 'express';
import { UsersController } from '../controllers/users.js'
import { ProductsController } from '../controllers/products.js'

const router = Router()

const Users = new UsersController()
const Products = new ProductsController()

router.get('/users', Users.getUsers)
router.post('/users', Users.createUser)
router.get('/users/:username', Users.getUserByUsername)
router.delete('/users/:username', Users.deleteUserByUsername)
router.patch('/users/:username', Users.updateUserByUsername)

router.get('/users/:username/cart', Users.getUserCart)
router.patch('/users/:username/cart', Users.modifyUserCart)
router.post('/users/:username/checkout', Users.checkoutUserCart)

router.get('/users/:username/history', Users.getUserOrderHistory)

router.get('/products', Products.getProducts)
router.get('/products/:title', Products.getProductByName)

export { router }