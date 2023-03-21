import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router } from './routes/routes.js';
// import cors from 'cors';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;
const companyID = "donutdave";
const creditAPI = "https://356-credit-api.fly.dev/api/transactions"
const droneAPI = "https://356-drone-api.fly.dev/api/drones"
const airbaseAPI = "https://356-drone-api.fly.dev/api/airbases"

// connect to db
let db_url = 'mongodb+srv://xinyao:20001028@cluster0.kwf9tsb.mongodb.net/proddb?retryWrites=true&w=majority'
if (app.get('env') === 'development') {
  console.log(`⚡️connecting to development db`)
  db_url = 'mongodb+srv://xinyao:20001028@cluster0.kwf9tsb.mongodb.net/devdb?retryWrites=true&w=majority'
} else if (app.get('env') === 'test') {
  console.log(`⚡️connecting to test db (local)`)
  db_url = 'mongodb://localhost:27017/donutdave_testdb'
} else if (app.get('env') === 'deploy_test') {
  console.log(`⚡️connecting to test db (deploy)`)
  db_url = 'mongodb+srv://xinyao:20001028@cluster0.kwf9tsb.mongodb.net/testdb?retryWrites=true&w=majority'
}
mongoose
  .connect(db_url)
  .catch(e => {
    console.error('Connection error', e.message)
  });
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:8080', 'https://dronuts-dave-frontend.fly.dev'];

// const options: cors.CorsOptions = {
//   origin: allowedOrigins
// };

// Then pass these options to cors:
// app.use(cors(options));
app.use(express.json())
app.use('/api', router)

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export { app, server, companyID, creditAPI, droneAPI, airbaseAPI } // for testing