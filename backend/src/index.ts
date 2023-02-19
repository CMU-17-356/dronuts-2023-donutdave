import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router } from './routes/routes.js';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

// connect to db
mongoose
  .connect('mongodb://127.0.0.1:27017/donutdave_db')
  .catch(e => {
    console.error('Connection error', e.message)
  });
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(express.json())
app.use('/api/v1', router)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});