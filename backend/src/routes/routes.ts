import { Router } from 'express';
import { UsersController } from '../controllers/users.js'
import { ProductsController } from '../controllers/products.js'
import { OrdersController } from '../controllers/orders.js'

const router = Router()

const Users = new UsersController()
const Products = new ProductsController()
const Orders = new OrdersController()

router.get('/users', Users.getUsers)
router.post('/users', Users.createUser)
router.get('/users/:username', Users.getUserByUsername)
router.delete('/users/:username', Users.deleteUserByUsername)
router.patch('/users/:username', Users.updateUserByUsername)
router.post('/users/:username/checkout', Users.checkoutUserCart)

router.get('/users/:username/history', Users.getUserOrderHistory)
router.get('/orders', Orders.getOrders)
router.get('/orders/:id', Orders.getOrderById)
router.post('/orders/totals', Orders.calculateTotalPrice)

router.get('/products', Products.getProducts)
router.get('/products/:title', Products.getProductByTitle)

export { router }