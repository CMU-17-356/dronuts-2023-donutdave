import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router } from './routes/routes.js';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;
const companyID = "donutdave";
const creditAPI = "https://356-credit-api.fly.dev/api/transactions"

// connect to db
let db_url = 'mongodb+srv://xinyao:20001028@cluster0.kwf9tsb.mongodb.net/proddb?retryWrites=true&w=majority'
if (app.get('env') === 'development') {
  console.log(`⚡️connecting to development db`)
  db_url = 'mongodb+srv://xinyao:20001028@cluster0.kwf9tsb.mongodb.net/devdb?retryWrites=true&w=majority'
} else if (app.get('env') === 'test') {
  console.log(`⚡️connecting to test db`)
  db_url = 'mongodb://localhost:27017/donutdave_testdb'
  // db_url = 'mongodb+srv://xinyao:20001028@cluster0.kwf9tsb.mongodb.net/testdb?retryWrites=true&w=majority'
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

app.use(express.json())
app.use('/api', router)

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export { app, server, companyID, creditAPI } // for testing